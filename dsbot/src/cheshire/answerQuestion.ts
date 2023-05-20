import fetch from 'node-fetch'
const ENDPOINT = "http://localhost:1865"
import { WebSocket } from 'ws'

interface SettingsResponse {
    status : string,
    setting : object
}

interface WSresponse {
    error : boolean,
    content : string,
    why : object
}

export default async function answerQuestion(key: string, question: string, ws : WebSocket) : Promise<string>{
    return new Promise(
        (resolve, reject) => {
            if(ws.readyState != ws.OPEN)
                return reject("the socket isn't open")
            fetch(`${ENDPOINT}/settings/llm/LLMOpenAIConfig`,
                {
                    method : "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify({
                        "model_name" : "text-davinci-003",
                        "openai_api_key" : key
                    }),
                    redirect : "follow"
                }
            )
                .then(async (res) => {
                    if(res.status != 200)
                        return reject("error in settings request")
                    const json = (await res.json()) as SettingsResponse
                    if(json.status != "success")
                        return reject("error in settings")
                    ws.send(JSON.stringify({
                        "text" : question
                    }))
                    ws.on("message", (data) => {
                        const res : WSresponse = (JSON.parse(data.toString())) as WSresponse
                        return resolve(res.content)
                    })
                })
        }
    )
}
