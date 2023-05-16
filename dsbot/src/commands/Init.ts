import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
import { RegisterModal } from '../modals/RegisterModal'
import { LoginModal } from '../modals/LoginModal'
import { User } from '../db/User'

export const Init: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('start session'),
    async execute(interaction) {
        User.findOne({ userID: interaction.user.id })
            .then((found) => {
                const modal = found ? LoginModal() : RegisterModal()
                interaction.showModal(modal)
            })
            .catch((err) => console.log(err))
    }
}
