import { getDestiny, getAllDestinies } from "@/data/getData"
import { DestinyViewer } from "@/data/destiny"
import { generateStaticParamsEncoder, decodeStaticParamsEncoder } from "@/betterEncodeURIComponent"

export default async function DestinyPage(input) {
    const params = await input.params
    if (params.destinyName === "%5BdestinyName%5D") return <div />

    const destinyPath = params.destinyName
    const data = await getDestiny(destinyPath)

    return <DestinyViewer data={data} />
}

export async function generateMetadata(input) {
    const params = await input.params

    const destinyPath = params.destinyName
    const data = await getDestiny(destinyPath)

    return {
        title: data.name,
    }
}

export async function generateStaticParams() {
    const dataCollection = await getAllDestinies()

    return Object.keys(dataCollection).map(name => {
        const result = {
            destinyName: generateStaticParamsEncoder(name)
        }
        return result
    })
}
