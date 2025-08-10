import type { Metadata } from "next";
import { getDestiny, getAllDestinies } from "@/data/destiny"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import DestinyEditor from "@/editor/destiny";

export default async function DestinyEditorPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    if (args.name === "%5Bname%5D") return <div />
    const name = decodePageParameter(args.name)

    const data = await getDestiny(name)
    return <DestinyEditor initialData={data} />
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
    const args = await params
    const name = decodePageParameter(args.name)

    const data = await getDestiny(name)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    if (process.env.INCLUDE_EDITOR !== `1`)
        return [{
            name: "%5Bname%5D"
        }]

    const dataCollection = await getAllDestinies()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
