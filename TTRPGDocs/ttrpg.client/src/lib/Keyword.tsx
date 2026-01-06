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
import SimpleKeyword, { GetSimpleKeywords } from "./data/simpleKeyword"
import { GetConditions } from "./data/condition"

export function Tooltip({ children }: { children: string }) {
    return (<small className="tooltip">
        <InlineFormattedText>({children})</InlineFormattedText>
    </small>)
}

export default async function Keyword({ children }: { children: string | string[] }) {
    if (typeof (children) !== "string") children = children.join('')

    const result = (await GetKeywordElements())[children]

    if (process.env.ALLOW_NO_SERVER === `1`)
        return result ?? <Fragment>{children}</Fragment>

    if (result === undefined) throw new Error(
        `Could not find keyword for "${children}"`
    )

    return result
}

interface KeywordData extends SimpleKeyword {
    element: JSX.Element
}
interface KeywordRecord {
    elementRecord: Record<string, JSX.Element>
    data: Record<string, KeywordData>
}

const keywordRecord: Promise<KeywordRecord> = updateKeywordRecord({
    elementRecord: {},
    data: {},
})
async function updateKeywordRecord(record: KeywordRecord) {
    const destinies = getAllDestinies()
    const origins = getAllOrigins()
    const tools = getAllTools()

    const arrayEntries = Object.entries(await destinies).map(([path, item]) => [`/destiny/${path}`, item.name, item.summary])
        .concat(Object.entries(await origins).map(([path, item]) => [`/origin/${path}`, item.name, item.summary]))
        .concat(Object.entries(await tools).map(([path, item]) => [`/tool/${path}`, item.name, item.summary]))
        .concat(GetAttributes().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, `Attribute: ${item.description}`]))
        .concat(GetSkills().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, item.summary]))
        .concat(GetSkillCategories().map(item => [`/article/attributes+and+skills#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))
        .concat(GetDamageTypes().map(item => [`/article/damage#${betterEncodeURIComponent(item.name)}`, item.name, item.description]))
        .concat(GetConditions().map(item => [`/article/conditions#${betterEncodeURIComponent(item.name)}`, item.name, item.summary]))
    record.data = Object.fromEntries(GetSimpleKeywords()
        .concat(arrayEntries.map(([path, name, summary]) => ({
            name: name,
            summary: summary,
            path: path,
        })))
        .map(item => {
            return [item.name.replace(' ', '_'), {
                ...item,
                element: (<Fragment>
                    <Link href={item.path} className="keyword">{item.name}<Tooltip>{item.summary}</Tooltip></Link>
                </Fragment>)
            }]
        }))

    record.elementRecord = Object.fromEntries(Object.entries(record.data)
        .map((([path, item]) => [path, item.element])))

    return record
}
export async function GetKeywordElements(): Promise<Record<string, JSX.Element>> {
    if (process.env.CACHE_SERVER_DATA != `1`) {
        updateKeywordRecord(await keywordRecord)
    }
    return (await keywordRecord).elementRecord
}
export async function GetKeywordData(): Promise<Record<string, KeywordData>> {
    if (process.env.CACHE_SERVER_DATA != `1`) {
        updateKeywordRecord(await keywordRecord)
    }
    return (await keywordRecord).data
}
