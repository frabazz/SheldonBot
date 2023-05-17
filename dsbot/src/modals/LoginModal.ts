import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ModalActionRowComponentBuilder} from 'discord.js'

export function LoginModal() {
    const modal = new ModalBuilder()
        .setCustomId('LoginModal')
        .setTitle('Login to Sheldon');

    const PswInput = new TextInputBuilder()
        .setCustomId("psw")
        .setLabel("Password")
        .setStyle(TextInputStyle.Short)

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(PswInput)
    modal.addComponents(firstActionRow);
    return modal;
}
