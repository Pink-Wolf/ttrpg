import type { Metadata } from "next";
import { getDestiny, getAllDestinies } from "@/data/destiny"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import DestinyEditor from "@/editor/destiny";

export default async function DestinyEditorPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return <div />

    const data = await getDestiny(name)
    return <DestinyEditor initialValue={data} id="destiny" />
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
    const args = await params
    const name = decodePageParameter(args.name)
    if (name === "[name]") return {}

    const data = await getDestiny(name)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    if (process.env.INCLUDE_EDITOR !== `1`)
        return [{
            name: `[name]` // generateStaticParams needs to return at least 1 page
        }]

    const dataCollection = await getAllDestinies()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
