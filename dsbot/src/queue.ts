interface user {
    userID : string
    key : string
}

interface question{
    userID : string,
    question : question
}

class queue{
    userQueue : user[]
    questionsQueue : question[]
    constructor(){
        this.userQueue = []
        this.questionsQueue = []
    }

    addUser(key : string, userID : string) : void{
        this.userQueue.push({
            key : key,
            userID : userID
        })
    }


}
