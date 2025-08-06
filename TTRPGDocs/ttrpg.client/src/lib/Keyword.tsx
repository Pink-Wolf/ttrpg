import "@/styles/Keyword.css"
import Link from "next/link"
import { getAllDestinies } from "./data/destiny"
import { getAllOrigins } from "./data/origin"
import { Fragment, JSX, ReactNode } from "react"
import { getAttributeSummaries } from "./data/attributes"
import { getSkillSummaries } from "./data/skills"
import betterEncodeURIComponent from "./betterEncodeURIComponent"
import GetDamageTypes from "./data/damageTypes"

export function Tooltip({ title, children }: { title: string, children: ReactNode }) {
    return (<small className="tooltip">
        ({children})
    </small>)
}

export default function Keyword({ children }: { children: string | string[] }) {
    if (typeof (children) !== "string") children = children.join('')

    return GetKeywordRecord()[children]
}

const keywordRecord: Record<string, JSX.Element> = await updateKeywordRecord({})
async function updateKeywordRecord(record: Record<string, JSX.Element>) {
    const destinies = getAllDestinies()
    const origins = getAllOrigins()

    const entries = Object.entries(await destinies).map(([path, item]) => [`/destiny/${path}`, item.name, item.summary])
        .concat(Object.entries(await origins).map(([path, item]) => [`/origin/${path}`, item.name, item.summary]))
        .concat(Object.entries(getAttributeSummaries()).map(([item, summary]) => [`/article/attributes+and+skills#${betterEncodeURIComponent(item)}`, item, `Attribute: ${summary}`]))
        .concat(Object.entries(getSkillSummaries()).map(([item, summary]) => [`/article/attributes+and+skills#${betterEncodeURIComponent(item)}`, item, summary]))
        .concat(Object.entries(GetDamageTypes()).map(([, item]) => [`/article/damage+types#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))

    entries.forEach(([path, name, description]) => {
        const field = name.replace(' ', '')
        record[field] = (<Fragment>
            <Link href={path} className="keyword">{name}<Tooltip title={name}>{description}</Tooltip></Link>
            
        </Fragment>)
    })

    return record
}
export function GetKeywordRecord(): Record<string, JSX.Element> {
    if (process.env.CACHE_SERVER_DATA != `1`) {
        updateKeywordRecord(keywordRecord)
    }
    return keywordRecord
}
