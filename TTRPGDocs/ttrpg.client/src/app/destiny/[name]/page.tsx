import type { Metadata } from "next";
import { getDestiny, getAllDestinies } from "@/data/destiny"
import { decodePageParameter, encodePageParameter, betterDecodeURIComponent } from "@/betterEncodeURIComponent";
import { Fragment } from "react";
import Link from "next/link";
import DestinyViewer from "@/data/DestinyViewer";

export default async function DestinyPage({ params }: { params: Promise<{ name: string }> }) {
    const args = await params
    if (args.name === "%5Bname%5D") return <div />
    const name = decodePageParameter(args.name)

    const data = await getDestiny(name)
    return <Fragment>
        {process.env.INCLUDE_EDITOR !== `1` ? "" : <Link href={`${args.name}/editor/`}>EDIT</Link>}
        <DestinyViewer data={data} />
    </Fragment>
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
