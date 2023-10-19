import { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, TextChannel, CommandInteraction, CacheType } from 'discord.js'
import { SlashCommand } from '../types'
import { Chat } from '../db/Chat'


export default <SlashCommand>{
    data: new SlashCommandBuilder()
        .setName('conversation')
        .setDescription('start a conversation in a new channel'),

    async execute(interaction) {
        await interaction.reply({ content: "Working on it...", ephemeral: true })
        const pastChat = await Chat.findOne({ userID: interaction.user.id, guildID: interaction.guild?.id })
        if (pastChat) {
            const channel = interaction.guild?.channels.cache.get(pastChat.channelID) || await interaction.guild?.channels.fetch(pastChat.channelID)
            if (channel) {
                await interaction.editReply({ content: `You already have an opened conversation: meet me in ${channel}` })
            } else {
                await Chat.deleteOne({ _id: pastChat._id })
                createChannel(interaction)
            }
        } else 
        if (interaction.guild && interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.Administrator)) {
            createChannel(interaction)
        } else {
            interaction.editReply({ content: "This command can only be used in a server or the bot doens't have Administration permission " })
        }
    }
}

async function createChannel(interaction: CommandInteraction<CacheType>) {
    try {
        const channel = await interaction.guild?.channels.create({
            name: `chat-${interaction.member?.user.username}`,
            permissionOverwrites: [{
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
            }, {
                id: interaction.guild.roles.everyone.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            }, {
                id: interaction.guild.members.me!.id,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.ReadMessageHistory,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.ManageChannels,
                ],
            }]
        }) as TextChannel
        const chat = new Chat({
            userID: interaction.user.id,
            channelID: channel.id,
            guildID: interaction.guild!.id
        })
        chat.save()
        await interaction.editReply({ content: `Let's meet in ${channel}` })
        await channel.send({ content: `Hey, ${interaction.member}` })
    } catch (error) {
        interaction.editReply({ content: "There was an error creating the channel" })
    }
    return 
}