'use client'

import { FormEvent, useState } from "react"
import Destiny, { DestinyInput, postDestiny } from "@/data/destiny"
import { SubmitInput } from "@/Input"

export default function DestinyEditor({ initialValue, id }: { initialValue: Destiny, id: string }) {
    const [value, setter] = useState<Destiny>(initialValue)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        postDestiny(value)
    }

    return (<form onSubmit={onSubmit}>
        <DestinyInput value={value} setter={setter} idPath={[id]} label="" />
        <SubmitInput label="Save" />
    </form>)
}