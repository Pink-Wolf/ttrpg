const DATABASE_URL = `http://127.0.0.1:5028/`
const DESTINY_URL = `${DATABASE_URL}destiny/`

const cachedResults = new Map()

async function getJsonNoCache(path) {
    const response = await fetch(path, {
        method: 'GET',
        cache: `no-cache`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) throw new Error(`Could not get data from "${path}" (${response.status}):\n${await response.text()}\n`)

    return await response.json()
}
async function getJson(path) {
    if (process.env.CACHE_SERVER_DATA == 1) {
        let cachedResult = cachedResults.get(path)
        if (cachedResult !== undefined) return await cachedResult

        cachedResults.set(path, getJsonNoCache(path))
        return await cachedResults.get(path)
    }
    else return getJsonNoCache(path)
}

export function getAllDestinies() {
    return getJson(DESTINY_URL)
}

export async function getDestiny(encodedName) {
    if (process.env.CACHE_SERVER_DATA == 1) { // just get all destinies once, if they are cached anyways
        const data = await getAllDestinies()
        return data[encodedName]
    }
    else return await getJson(DESTINY_URL + encodedName)
}
