import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
import { Chat } from '../db/Chat'

export default <SlashCommand>{
    data: new SlashCommandBuilder()
        .setName('end')
        .setDescription('end a conversation'),

    async execute(interaction) {
        await interaction.reply({ content: "Working on it...", ephemeral: true })
        const chat = await Chat.findOne({ channelID: interaction.channel?.id })

        if (chat) {
            if (chat.userID == interaction.user.id) {
                try {
                    await interaction.channel?.delete()
                    await Chat.deleteOne({ _id: chat._id })
                } catch (error) {
                    interaction.editReply({ content: "There was an error deleting the channel" })
                }
            } else {
                interaction.editReply({ content: "You can't delete a channel that isn't yours" })
            }
        } else {
            interaction.editReply({ content: "This is not a conversation channel" })
        }
    }
}
