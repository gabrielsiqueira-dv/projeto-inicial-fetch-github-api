import { baseUrl } from "./src/scripts/services/variable.js"

async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()

   
}


export { getUser }