import type { Metadata } from "next";
import { getOrigin, OriginViewer, getAllOrigins } from "@/data/origin"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";

export default async function OriginPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    if (args.name === "%5Bname%5D") return <div />
    const name = decodePageParameter(args.name)

    const data = await getOrigin(name)
    return <OriginViewer data={data} />
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
    const args = await params
    const name = decodePageParameter(args.name)

    const data = await getOrigin(name)
    return {
        title: data.name
    }
}

export async function generateStaticParams() {
    const dataCollection = await getAllOrigins()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
