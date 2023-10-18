import dotenv from 'dotenv'
dotenv.config()
import { env } from './env_check'

import { readdirSync } from 'fs'
import path from 'path'

import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js'

const { TOKEN, CLIENT_ID, GUILD_ID} = env

const commands = []
const files = readdirSync(path.join(__dirname, 'commands')).filter(file =>
	file.endsWith('.js')
)
for (const file of files) {
	const command = require(path.join(__dirname,`commands/${file}`))
	delete command.execute

	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	}
}

const rest = new REST().setToken(TOKEN);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = (await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		)) as RESTPostAPIApplicationCommandsJSONBody[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
