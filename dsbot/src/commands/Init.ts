import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
import { RegisterModal } from '../modals/RegisterModal'
import { LoginModal } from '../modals/LoginModal'
import { User } from '../db/User'

export const Init: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('start session')
        .addStringOption(
            option =>
                option
                    .setName("reset")
                    .setDescription("option to reset the password, leave blank otherwise")
                    .addChoices(
                        {name : "yes", value : "true"}
                    )
        ),
    async execute(interaction) {
        User.findOne({ userID: interaction.user.id })
            .then(async (found) => {
                const reset = interaction.options.get("reset")?.value
                if(reset == undefined || !reset){
                    const modal = found ? LoginModal() : RegisterModal()
                    interaction.showModal(modal)
                }
                else{
                    if(found){
                        await User.deleteOne({_id : found._id})
                        interaction.showModal(RegisterModal())
                    }
                    else
                        interaction.reply("cannot reset a user if it isn't registered")
                }
            })
            .catch((err) => console.log(err))
    }
}
