'use client'

import { FormEvent, useState } from "react"
import Origin, { OriginInput, postOrigin } from "@/data/origin"
import { SubmitInput } from "@/Input"

export default function OriginEditor({ initialValue, id }: { initialValue: Origin, id: string }) {
    const [value, setter] = useState<Origin>(initialValue)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        postOrigin(value)
    }

    return (<form onSubmit={onSubmit}>
        <OriginInput value={value} setter={setter} idPath={[id]} label="" />
        <SubmitInput label="Save" />
    </form>)
}