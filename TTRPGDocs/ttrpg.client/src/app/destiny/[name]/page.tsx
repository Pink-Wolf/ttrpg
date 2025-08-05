import type { Metadata } from "next";
import { getDestiny, DestinyViewer, getAllDestinies } from "@/data/destiny"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";

export default async function DestinyPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    if (args.name === "%5Bname%5D") return <div />
    const name = decodePageParameter(args.name)

    const data = await getDestiny(name)
    return <DestinyViewer data={data} />
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
    const dataCollection = await getAllDestinies()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
