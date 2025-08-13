'use client'

import { postDestiny } from "@/data/destiny"
import NewButton from "./NewButton"
import betterEncodeURIComponent from "../betterEncodeURIComponent"

export default function NewDestinyButton({
    children,
}: {
    children?: string | string[],
}) {
    async function onSubmit(name: string) {
        await postDestiny({
            name: name,
            summary: ``,
            description: ``,
            playstyles: [],
            abilities: {},
        })
        return `/destiny/${betterEncodeURIComponent(name)}/editor`
    }

    return <NewButton submitAction={onSubmit}>{children}</NewButton>
}