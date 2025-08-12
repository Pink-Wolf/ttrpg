const DATABASE_URL = `https://localhost:7068/`

const cachedResults = new Map()

async function fetchData<Type>(path: string): Promise<Type> {
    const response = await fetch(DATABASE_URL + path, {
        method: `GET`,
        cache: `no-cache`,
        headers: {
            'Content-Type': `application/json`,
        },
    })
    if (!response.ok) {
        throw new Error(
            `Could not get data from "${path}" (${response.status}):\n${await response.text()}\n`
        )
    }

    return await response.json()
}
export function getDataNoCache<Type>(path: string): Promise<Type> {
    if (process.env.ALLOW_NO_SERVER == `1`)
        return fetchData(path).catch(e => ({})) as Promise<Type>
    else
        return fetchData(path)
}
export async function getData<Type>(path: string): Promise<Type> {
    if (process.env.CACHE_SERVER_DATA == `1`) {
        const cachedResult = cachedResults.get(path)
        if (cachedResult !== undefined) return await cachedResult

        cachedResults.set(path, getDataNoCache<Type>(path))
        return await cachedResults.get(path)
    }
    else return getDataNoCache<Type>(path)
}

export function postData<Type>(path: string, data: Type): Promise<Response> {
    return fetch(DATABASE_URL + path, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify(data, null, 2),
    })
}
