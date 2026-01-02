'use client'

import { postOrigin } from "@/data/origin"
import NewButton from "./NewButton"
import betterEncodeURIComponent from "../betterEncodeURIComponent"

export default function NewOriginButton({
    children,
}: {
    children?: string | string[],
}) {
    async function onSubmit(name: string) {
        await postOrigin({
            name: name,
            summary: ``,
            description: ``,
            skills: [],
        })
        return `/origin/${betterEncodeURIComponent(name)}/editor`
    }

    return <NewButton submitAction={onSubmit}>{children}</NewButton>
}