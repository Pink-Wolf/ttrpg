'use client'

import { FormEvent, useState } from "react"
import Origin, { OriginInput, postOrigin } from "@/data/origin"
import { SubmitInput } from "@/Input"

export default function OriginEditor({ initialValue, id }: { initialValue: Origin, id: string }) {
    const [value, setter] = useState<Origin>(initialValue)
    const [processing, setProcessing] = useState<boolean>(false)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setProcessing(true)
        postOrigin(value).then(() => {
            setProcessing(false)
        }).catch(e => {
            setProcessing(false)
            alert(`Failed to save: ${e}`)
        })
    }

    return (<form onSubmit={onSubmit}>
        <OriginInput value={value} setter={setter} idPath={[id]} label="" disabled={processing} />
        <SubmitInput label="Save" />
    </form>)
}