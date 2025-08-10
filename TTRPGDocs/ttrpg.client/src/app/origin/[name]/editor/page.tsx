import type { Metadata } from "next";
import { getOrigin, getAllOrigins } from "@/data/origin"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import OriginEditor from "@/editor/origin";

export default async function OriginPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    if (args.name === "%5Bname%5D") return <div />
    const name = decodePageParameter(args.name)

    const data = await getOrigin(name)
    return <OriginEditor initialData={data} />
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
    if (process.env.INCLUDE_EDITOR !== `1`)
        return [{
            name: "%5Bname%5D"
        }]

    const dataCollection = await getAllOrigins()

    return Object.keys(dataCollection).map(name => {
        const result = {
            name: encodePageParameter(betterDecodeURIComponent(name))
        }
        return result
    })
}
