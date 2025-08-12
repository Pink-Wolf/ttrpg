import "@/styles/origin.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData, postData } from "./getData";
import Ability from "./ability";

export default interface Origin {
    name: string;
    summary: string;
    description: string;
    attributes?: Record<string, string>;
    skills?: Record<string, string>;
    abilities?: Ability[];
    suborigins?: Origin[];
}


export function getAllOrigins(): Promise<Record<string, Origin>> {
    return getData<Record<string, Origin>>("origin/")
}

export async function getOrigin(name: string): Promise<Origin> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllOrigins()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find origin with name ${encodedName}`
        )
        return data
    }
    else return await getData("origin/" + encodedName)
}

export function postOrigin(data: Origin): Promise<Response> {
    return postData(`origin`, data)
}
