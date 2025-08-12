import "@/styles/origin.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData, postData } from "./getData";
import Ability from "./ability";

export default interface Tool {
    name: string;
    summary: string;
    description: string;
    abilities: Ability[];
    level?: string;
    price?: string;
    rarity?: string;
}


export function getAllTools(): Promise<Record<string, Tool>> {
    return getData<Record<string, Tool>>("tool/")
}

export async function getTool(name: string): Promise<Tool> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllTools()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find tool with name ${encodedName}`
        )
        return data
    }
    else return await getData("tool/" + encodedName)
}

export function postTool(data: Tool): Promise<Response> {
    return postData(`tool`, data)
}
