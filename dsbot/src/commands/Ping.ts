import {SlashCommandBuilder} from 'discord.js'
import { SlashCommand } from '../types'

export const Ping : SlashCommand = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong!'),
    async execute(interaction){
        await   interaction.reply('Pong!')
    }
}
