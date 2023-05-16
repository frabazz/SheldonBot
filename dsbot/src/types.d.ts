import {Collection, SlashCommandBuilder, CommandInteraction} from 'discord.js'

declare module "discord.js" {
    export interface Client {
        commands: Collection
    }
}

interface SlashCommand {
    data : SlashCommandBuilder,
    execute : (interaction : CommandInteraction) => void
}
