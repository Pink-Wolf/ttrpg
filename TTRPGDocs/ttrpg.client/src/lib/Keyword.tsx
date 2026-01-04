import "@/styles/Keyword.css"
import Link from "next/link"
import { getAllDestinies } from "./data/destiny"
import { getAllOrigins } from "./data/origin"
import { Fragment, JSX } from "react"
import { GetAttributes } from "./data/attributes"
import { GetSkillCategories, GetSkills } from "./data/skills"
import betterEncodeURIComponent from "./betterEncodeURIComponent"
import { GetDamageTypes } from "./data/damageTypes"
import { InlineFormattedText } from "./formatter"
import { getAllTools } from "./data/tool"
import { GetSimpleKeywords } from "./data/simpleKeyword"
import { GetConditions } from "./data/condition"

export function Tooltip({ children }: { children: string }) {
    return (<small className="tooltip">
        <InlineFormattedText>({children})</InlineFormattedText>
    </small>)
}

export default async function Keyword({ children }: { children: string | string[] }) {
    if (typeof (children) !== "string") children = children.join('')

    const result = (await GetKeywordRecord())[children]

    if (process.env.ALLOW_NO_SERVER === `1`)
        return result ?? <Fragment>{children}</Fragment>

    if (result === undefined) throw new Error(
        `Could not find keyword for "${children}"`
    )

    return result
}

const keywordRecord: Promise<Record<string, JSX.Element>> = updateKeywordRecord({})
async function updateKeywordRecord(record: Record<string, JSX.Element>) {
    const destinies = getAllDestinies()
    const origins = getAllOrigins()
    const tools = getAllTools()

    const entries = GetSimpleKeywords().map(keyword => [keyword.path, keyword.name, keyword.summary])
        .concat(Object.entries(await destinies).map(([path, item]) => [`/destiny/${path}`, item.name, item.summary]))
        .concat(Object.entries(await origins).map(([path, item]) => [`/origin/${path}`, item.name, item.summary]))
        .concat(Object.entries(await tools).map(([path, item]) => [`/tool/${path}`, item.name, item.summary]))
        .concat(GetAttributes().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, `Attribute: ${item.description}`]))
        .concat(GetSkills().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, item.summary]))
        .concat(GetSkillCategories().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))
        .concat(GetDamageTypes().map(item => [`/article/damage#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))
        .concat(GetConditions().map(item => [`/article/conditions#${betterEncodeURIComponent(item.name)}`, item.name, item.summary]))

    entries.forEach(([path, name, description]) => {
        const field = name.replace(' ', '')
        record[field] = (<Fragment>
            <Link href={path} className="keyword">{name}<Tooltip>{description}</Tooltip></Link>
        </Fragment>)
    })

    return record
}
export async function GetKeywordRecord(): Promise<Record<string, JSX.Element>> {
    if (process.env.CACHE_SERVER_DATA != `1`) {
        updateKeywordRecord(await keywordRecord)
    }
    return await keywordRecord
}
