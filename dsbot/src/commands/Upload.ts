import {SlashCommandBuilder} from 'discord.js'
import { SlashCommand } from '../types'

export const Upload : SlashCommand = {
    data : new SlashCommandBuilder()
        .setName('upload')
        .setDescription('replies with pong!'),
    async execute(interaction){
        await interaction.reply('Pong!')
    }
}
