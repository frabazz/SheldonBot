import {Collection, SlashCommandBuilder, CommandInteraction, SlashCommandSubcommandsOnlyBuilder} from 'discord.js'
import {queue} from './queue'
import {WebSocket} from 'ws'

declare module "discord.js" {
    export interface Client {
        commands: Collection,
        queue : queue,
        websocket : WebSocket
    }
}

interface SlashCommand {
    data : SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand", "addSubcommandGroup">,
    execute : (interaction : CommandInteraction) => void
}
