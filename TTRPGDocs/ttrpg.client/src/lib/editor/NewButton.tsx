'use client'

import { FormEvent, useState } from "react"
import { BasicInput, SubmitInput } from "@/Input"
import { redirect, RedirectType } from "next/navigation"

export default function NewButton({
    submitAction,
    children,
}: {
    submitAction: (name: string) => Promise<string | undefined>,
    children?: string | string[],
}) {
    children ??= `Create`
    if (typeof (children) !== "string") children = children.join('')
    if (children === ``) children = `Create`

    const [name, nameSetter] = useState<string>(``)

    function onSubmitMiddleware(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        submitAction(name).then(path => {
            if (typeof path !== `undefined`)
                redirect(path, RedirectType.push)
        })
    }

    return (<form onSubmit={onSubmitMiddleware}>
        <BasicInput value={name} setter={nameSetter} idPath={[`newKey`]} label="" />
        <SubmitInput label={children} />
    </form>)
}