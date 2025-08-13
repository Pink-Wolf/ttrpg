'use client'

import { postTool } from "@/data/tool"
import NewButton from "./NewButton"
import betterEncodeURIComponent from "../betterEncodeURIComponent"

export default function NewToolButton({
    children,
}: {
    children?: string | string[],
}) {
    async function onSubmit(name: string) {
        await postTool({
            name: name,
            summary: ``,
            description: ``,
            abilities: [],
        })
        return `/tool/${betterEncodeURIComponent(name)}/editor`
    }

    return <NewButton submitAction={onSubmit}>{children}</NewButton>
}