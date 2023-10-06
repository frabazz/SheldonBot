import {} from 'discord.js'
import {env} from './env_check'
import answerQuestion from './cheshire/answerQuestion'
import isTokenValid from './cheshire/isTokenValid'
import {Client} from 'discord.js'

interface user {
    userID : string
    key : string
}

interface question{
    userID : string,
    question : string,
    callback : Function
}

const {POLL_TIME} = env

export class queue{
    userQueue : user[]
    questionsQueue : question[]
    answering : boolean
    client : Client
    constructor(client : Client){
        this.userQueue = []
        this.questionsQueue = []
        this.answering = false
        this.client = client
        setInterval(() => {
            if(!this.answering && this.questionsQueue.length > 0)
                this.shiftQuestion()
        }, POLL_TIME)
    }
    addUser(key : string, userID : string) : void{
        this.userQueue.push({
            key : key,
            userID : userID
        })
    }

    removeUser(userID : string) : void{
        let index = this.userQueue.findIndex(
            user => user.userID == userID
        )
        if(index != -1)
            this.userQueue.splice(index, 1)
    }

    isUserOnDb(userID : string) : boolean{
        let index = this.userQueue.findIndex(
            user => user.userID == userID
        )
        return (index != -1)
    }

    addQuestion(userID : string, question : string, callback : Function) : boolean{
        const index = this.userQueue.findIndex(user => user.userID == userID)
        if(index == -1)
            return false;
        else{
            this.questionsQueue.push({
                userID : userID,
                question : question,
                callback : callback
            })
            return true
        }
    }

    private async shiftQuestion() {
        this.answering = true
        const question = this.questionsQueue.shift()!
        const user_i = this.userQueue.findIndex(
            user => user.userID == question.userID
        )
        /*if(user_i != -1)
            answerQuestion(this.userQueue[user_i]!.key, question.question)
                .then((answer) => {
                    this.answering = false
                    console.log("risposto con ", answer)
                    question.callback(answer)
                })
        */
        if(user_i != -1){
            const valid = isTokenValid(this.userQueue[user_i]!.key)
            if(!valid)
                question.callback("token isn't valid", "")
            else
                answerQuestion(
                    this.userQueue[user_i]!.key,
                    question.question,
                    this.client.websocket
                )
                    .then((ans : string) => question.callback(false, ans))
                    .catch((err : string) => question.callback(err, ""))
                    .finally(() => this.answering = false)
        }
    }
}
