import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config()

import { env } from './env_check'

import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js'

import mongoose from 'mongoose'
import { decrypt, encrypt } from './db/Encrypter'
import { User } from './db/User'
import { queue } from './queue'
import { WebSocket } from 'ws'
const ws_endpoint = "ws://localhost:1865/ws"

const { CHALLENGE, TOKEN, DB_CONNECTION} = env

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });

client.commands = new Collection();

client.once(Events.ClientReady, () => {
    client.queue = new queue(client)
    client.websocket = new WebSocket(ws_endpoint)
    client.websocket.on("open", () => {
        console.log("CHESHIRE>\tSocket opened with the server")
    })
    console.log('BOT> \t\tReady!');
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }

    else if (interaction.isModalSubmit()) {
        if (interaction.customId == "RegisterModal") {
            const psw = interaction.fields.getTextInputValue("psw")
            const key = interaction.fields.getTextInputValue("key")
            const user = new User({
                userID: interaction.user.id,
                key: encrypt(psw, key),
                challenge: encrypt(psw, CHALLENGE)
            })
            user.save()
                .then(() => {
                    interaction.reply("ok")
                    client.queue.addUser(
                        key,
                        interaction.user.id
                    )
                })
                .catch(() => interaction.reply("error"))
        }
        else if (interaction.customId == "LoginModal") {
            const psw = interaction.fields.getTextInputValue("psw") || ''
            User.findOne({ userID: interaction.user.id })
                .then((user) => {
                    if (user && decrypt(psw, user.challenge) == CHALLENGE) {
                        client.queue.addUser(
                            decrypt(psw, user.key),
                            user.userID
                        )
                        interaction.reply({
                            ephemeral: true,
                            content: "correctly logged in"
                        })
                    }
                    else {
                        interaction.reply({
                            ephemeral: true,
                            content: "wrong password!"
                        })
                    }
                })
        }
    }
});

console.log('Trying to login...')
mongoose.connect(DB_CONNECTION)
    .then(() => {
        console.log("BOT>DB \t\tConnected to DB, logging into discord")
        client.login(TOKEN)
    })
    .catch(err => console.log(err))
