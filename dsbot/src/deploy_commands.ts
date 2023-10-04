import dotenv from 'dotenv'
dotenv.config()
import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js'
import { commands } from './commands/exporter'

const token = process.env.TOKEN || "error"
const clientId = process.env.CLIENT_ID || "error"

const commandJSONs: RESTPostAPIApplicationCommandsJSONBody[] =
	commands.map(cmnd => cmnd.data.toJSON())

interface pseudoData {
	length: number
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commandJSONs.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = (await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandJSONs },
		)) as pseudoData;

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
