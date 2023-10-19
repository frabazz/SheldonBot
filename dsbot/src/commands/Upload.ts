import { Attachment, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
const endpoint = "http://localhost:1865/rabbithole/web/"

export default <SlashCommand> {
    data: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('upload a file')
        .addAttachmentOption(
            option =>
                option
                    .setName("file")
                    .setDescription("the file to upload")
                    .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.reply({ content: "Working on it...", ephemeral: true })

        try {
            const file = interaction.options.get('file')?.attachment as Attachment
            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    url: file.url,
                })
            })
            const data = await response.json()
            if (data.error) {
                await interaction.editReply({ content: 'Didn\'t work, report it!' })
            } else 
            await interaction.editReply({ content: data.info })
        } catch (error) {
            console.error(error)
            await interaction.editReply({ content: "Something went wrong" })
        }
        
    }
}
