import { MDXRemote } from "next-mdx-remote-client/rsc"
import { JSX } from "react"
import { GetKeywordRecord } from "./Keyword"

export function toTitleCase(str: string): string {
    return upperCaseFirstLetter(str.replace(/\s\w/g, x => x.charAt(0) + x.charAt(1).toUpperCase()))
}
export function upperCaseFirstLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1)
}
export function fromCamelCaseToSpaced(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1).replace(/[A-Z]+/g, ` $0`)}`
}

export default async function FormattedText({ children }: { children: string | string[] }): Promise<JSX.Element> {
    if (typeof(children) !== "string") children = children.join('')

    const options = {
        scope: await GetKeywordRecord()
    }
    return (<MDXRemote source={children} options={options} />)
}
export function InlineFormattedText({ children }: { children: string | string[] }): string {
    if (typeof (children) !== "string") children = children.join('')

    return children.replace(/[\{\}]/g, '')
}
