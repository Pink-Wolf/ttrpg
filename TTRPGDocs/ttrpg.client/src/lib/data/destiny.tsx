import { getData } from "./getData";

const DESTINY_URL_PATH = `destiny/`

export default interface Destiny {
    name: string;
    description: string;
}

export async function DestinyViewer({ data }: { data: Destiny }) {
    const destiny = data

    return (<article>
        <h1>{destiny.name}</h1>
        <p>{destiny.description}</p>
    </article>)
}

export function getAllDestinies(): Promise<Record<string, Destiny>> {
    return getData<Record<string, Destiny>>(DESTINY_URL_PATH)
}
export async function getDestiny(name: string): Promise<Destiny> {
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all destinies once, if they are cached anyways
        const dataContainer = await getAllDestinies()
        const data = dataContainer[name]
        if (data === undefined) throw new Error(
            `Could not find destiny with name ${name}`
        )
        return data
    }
    else return await getData(DESTINY_URL_PATH + name)
}
