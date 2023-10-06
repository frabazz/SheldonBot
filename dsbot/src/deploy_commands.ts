import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path : path.join(__dirname, '../../.env')})

import {env} from './env_check'

import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js'
import { commands } from './commands/exporter'

const {TOKEN, CLIENT_ID} = env

const commandJSONs: RESTPostAPIApplicationCommandsJSONBody[] =
	commands.map(cmnd => cmnd.data.toJSON())

interface pseudoData {
	length: number
}

const rest = new REST().setToken(TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commandJSONs.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = (await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commandJSONs },
		)) as pseudoData;

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
