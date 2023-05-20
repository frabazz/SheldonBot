import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

export const Answer: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('answer')
        .setDescription('answers to question')
        .addStringOption(option =>
            option
                .setName("question")
                .setDescription("the question to answer to")
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.get("question")?.value
        if (!interaction.client.queue.isUserOnDb(
            interaction.user.id
        )) {
            interaction.reply("You aren't registered! run /init")
        }
        else if (question == undefined || !question) {
            interaction.reply("there was en error fetching the question")
        }
        else {
            interaction.deferReply()
            interaction.client.queue.addQuestion(
                interaction.user.id,
                question.toString(),
                (err : string, answer : string) => {
                    if(err)
                        interaction.editReply("there was en error processing your request")
                    else
                        interaction.editReply(answer)
                }
            )
        }
    }
}
