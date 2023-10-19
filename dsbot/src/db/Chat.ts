import moongose from 'mongoose'

export interface ChatInterface{
    channelID : number,
    userID: number,
    guildID: number
}

const ChatSchema = new moongose.Schema({
    channelID : {
        type : String,
        required : true,
    },
    userID : {
        type : String,
        required : true,
    },
    guildID : {
        type : String,
        required : true,
    }
})

export const Chat = moongose.model("Chat", ChatSchema)
