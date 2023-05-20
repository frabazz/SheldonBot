import moongose from 'mongoose'

export interface UserInterface{
    userID : number,
    key : string,
    encrypted : boolean
}

const UserSchema = new moongose.Schema({
    userID : {
        type : String,
        required : true,
        unique : true
    },
    key : {
        type : String,
        required : true,
        unique : true
    },
    challenge : {
        type : String,
        required : true
    }
})

export const User = moongose.model("User", UserSchema)
