import {SlashCommandBuilder} from 'discord.js'
import { SlashCommand } from '../types'

export default <SlashCommand>{
    data : new SlashCommandBuilder()
        .setName('upload')
        .setDescription('upload a file')
        .addAttachmentOption(
            option =>
                option
                    .setName("file")
                    .setDescription("the file to upload")
                    .setRequired(true)
        ),
        
    async execute(interaction){
        await interaction.reply('Pong!')
    }
}
