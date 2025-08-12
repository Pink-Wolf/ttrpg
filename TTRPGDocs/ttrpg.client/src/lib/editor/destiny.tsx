'use client'

import { FormEvent, useState } from "react"
import Destiny, { DestinyInput, postDestiny } from "@/data/destiny"
import { SubmitInput } from "@/Input"

export default function DestinyEditor({ initialValue, id }: { initialValue: Destiny, id: string }) {
    const [value, setter] = useState<Destiny>(initialValue)
    const [processing, setProcessing] = useState<boolean>(false)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setProcessing(true)
        postDestiny(value).then(() => {
            setProcessing(false)
        }).catch(e => {
            setProcessing(false)
            alert(`Failed to save: ${e}`)
        })
    }

    return (<form onSubmit={onSubmit}>
        <DestinyInput value={value} setter={setter} idPath={[id]} label="" disabled={processing} />
        <SubmitInput label="Save" />
    </form>)
}