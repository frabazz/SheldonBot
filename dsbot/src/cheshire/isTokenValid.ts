import fetch from 'node-fetch'

export default async function isTokenValid(token: string) {

    const headers = {
        "Authorization": "Bearer " + token
    }

    return new Promise(
        (resolve) => {
            fetch("https://api.openai.com/v1/models", {
                method: "GET",
                headers: headers
            })
                .then(res => resolve(res.status == 200))
                .catch(() => resolve(false))
        }
    )
}

