import moongose from 'mongoose'

export interface UserInterface{
    userID : number,
    key : string,
    encrypted : boolean
}

const UserSchema = new moongose.Schema({
    userID : {
        type : Number,
        required : true,
        unique : true
    },
    key : {
        type : String,
        required : true,
        unique : true
    },
    encrypted : {
        type : Boolean,
        required : true,
    },
    challenge : {
        type : String,
        required : false
    }
})

export const User = moongose.model("User", UserSchema)
