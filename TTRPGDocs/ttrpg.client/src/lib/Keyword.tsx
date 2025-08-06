import Link from "next/link"
import { getAllDestinies } from "./data/destiny"
import { getAllOrigins } from "./data/origin"
import { JSX } from "react"
import { getAttributeNames } from "./data/attributes"
import getSkillNames from "./data/skills"

export default function Keyword({ children }: { children: string | string[] }) {
    if (typeof (children) !== "string") children = children.join()
    return GetKeywordRecord()[children]
}

const keywordRecord: Record<string, JSX.Element> = await updateKeywordRecord({})
async function updateKeywordRecord(record: Record<string, JSX.Element>) {
    const destinies = getAllDestinies()
    const origins = getAllOrigins()

    Object.entries(await destinies).map(([path, item]) => [`/destiny/${path}`, item.name])
        .concat(Object.entries(await origins).map(([path, item]) => [`/origin/${path}`, item.name]))
        .concat(getAttributeNames().map(item => [`/article/attributes+and+skills#${item.toLowerCase()}`, item]))
        .concat(getSkillNames().map(item => [`/article/attributes+and+skills#${item.toLowerCase() }`, item]))
        .forEach(([path, name]) => {
            record[name] = <Link href={path} className="keyword">{name}</Link>
        })

    return record
}
export function GetKeywordRecord(): Record<string, JSX.Element> {
    if (process.env.CACHE_SERVER_DATA != `1`) {
        updateKeywordRecord(keywordRecord)
    }
    return keywordRecord
}
