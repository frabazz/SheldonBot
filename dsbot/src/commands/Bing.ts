import {SlashCommandBuilder} from 'discord.js'
import { SlashCommand } from '../types'

export const Bing : SlashCommand = {
    data : new SlashCommandBuilder()
        .setName('ring')
        .setDescription('replies with Bong!'),
    async execute(interaction){
        await   interaction.reply('rong!')
    }
}
