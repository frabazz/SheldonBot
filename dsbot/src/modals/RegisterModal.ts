import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ModalActionRowComponentBuilder} from 'discord.js'

export function RegisterModal() {
    const modal = new ModalBuilder()
        .setCustomId('RegisterModal')
        .setTitle('Register to Sheldon');

    const KeyInput = new TextInputBuilder()
        .setCustomId("key")
        .setLabel("openAI api key")
        .setMaxLength(100)
        .setStyle(TextInputStyle.Short)

    const PswInput = new TextInputBuilder()
        .setCustomId("psw")
        .setLabel("Optional, password to password protect key")
        .setMinLength(8)
        .setMaxLength(12)
        .setStyle(TextInputStyle.Short)

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(KeyInput)
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(PswInput);

    modal.addComponents(firstActionRow, secondActionRow);
    return modal;
}
