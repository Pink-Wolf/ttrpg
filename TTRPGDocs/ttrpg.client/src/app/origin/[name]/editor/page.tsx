import type { Metadata } from "next";
import { getOrigin, getAllOrigins } from "@/data/origin"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import OriginEditor from "@/editor/origin";

export default async function OriginEditorPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return <div />

    const data = await getOrigin(name)
    return <OriginEditor initialValue={data} id="origin" />
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return {}

    const data = await getOrigin(name)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    if (process.env.INCLUDE_EDITOR !== `1`)
        return [{
            name: `[name]` // generateStaticParams needs to return at least 1 page
        }]

    const dataCollection = await getAllOrigins()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
