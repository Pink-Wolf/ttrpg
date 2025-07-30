import type { Metadata } from "next";
import { getDestiny, DestinyViewer, getAllDestinies } from "@/data/destiny"
import { decodePageParameter, encodePageParameter } from "@/betterEncodeURIComponent";

export default async function DestinyPage({ params }: { params: Promise<{ destinyName: string }> }) {
    const args = await params
    if (args.destinyName === "%5BdestinyName%5D") return <div />
    const destinyName = decodePageParameter(args.destinyName)

    const data = await getDestiny(destinyName)
    return <DestinyViewer data={data} />
}

export async function generateMetadata({ params }: { params: Promise<{ destinyName: string }> }): Promise<Metadata> {
    const args = await params
    const destinyName = decodePageParameter(args.destinyName)

    const data = await getDestiny(destinyName)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    const dataCollection = await getAllDestinies()

    return Object.keys(dataCollection).map(name => {
        const result = {
            destinyName: encodePageParameter(name)
        }
        return result
    })
}
