import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData, postData } from "./getData";
import Ability from "./ability";

export default interface Destiny {
    name: string;
    summary: string;
    description: string;
    playstyles: DestinyPlaystyle[];
    abilities: Record<string, Ability[]>;
}
export interface DestinyPlaystyle {
    title: string;
    description: string;
}

export function getAllDestinies(): Promise<Record<string, Destiny>> {
    return getData<Record<string, Destiny>>("destiny/")
}

export async function getDestiny(name: string): Promise<Destiny> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllDestinies()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find destiny with name ${encodedName}`
        )
        return data
    }
    else return await getData("destiny/" + encodedName)
}

export function postDestiny(data: Destiny): Promise<Response> {
    return postData(`destiny`, data)
}
