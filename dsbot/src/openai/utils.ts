import axios from 'axios'

async function isTokenValid(token: string) {

    const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }

    return new Promise(
        (resolve) => axios.get("https://api.openai.com/v1/models", config)
            .then(res => resolve(res.status === 200))
            .catch(() => resolve(false))
    )
}

isTokenValid("guua")
