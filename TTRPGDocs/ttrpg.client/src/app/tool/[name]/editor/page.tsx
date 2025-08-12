import type { Metadata } from "next";
import { getTool, getAllTools } from "@/data/tool"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import ToolEditor from "@/editor/tool";

export default async function ToolEditorPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return <div />

    const data = await getTool(name)
    return <ToolEditor initialValue={data} id="tool" />
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return {}

    const data = await getTool(name)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    if (process.env.INCLUDE_EDITOR !== `1`)
        return [{
            name: `[name]` // generateStaticParams needs to return at least 1 page
        }]

    const dataCollection = await getAllTools()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
