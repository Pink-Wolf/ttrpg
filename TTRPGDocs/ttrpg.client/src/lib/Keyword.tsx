import "@/styles/Keyword.css"
import Link from "next/link"
import { getAllDestinies } from "./data/destiny"
import { getAllOrigins } from "./data/origin"
import { Fragment, JSX } from "react"
import { GetAttributes } from "./data/attributes"
import { GetSkills } from "./data/skills"
import betterEncodeURIComponent from "./betterEncodeURIComponent"
import { GetDamageTypes } from "./data/damageTypes"
import { InlineFormattedText } from "./formatter"

export function Tooltip({ children }: { children: string }) {
    return (<small className="tooltip">
        <InlineFormattedText>({children})</InlineFormattedText>
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
        .concat(GetAttributes().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, `Attribute: ${item.description}`]))
        .concat(GetSkills().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, item.summary]))
        .concat(GetDamageTypes().map(item => [`/article/damage+types#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))

    entries.forEach(([path, name, description]) => {
        const field = name.replace(' ', '')
        record[field] = (<Fragment>
            <Link href={path} className="keyword">{name}<Tooltip>{description}</Tooltip></Link>
            
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
