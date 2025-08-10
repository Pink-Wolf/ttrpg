'use client'

import { FormEvent, useState } from "react"
import Origin, { postOrigin } from "@/data/origin"
import Input, { SubmitInput } from "@/Input"

export default function OriginEditor({ initialData }: { initialData: Origin }) {
    const [data, dataSetter] = useState<Origin>(initialData)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        postOrigin(data)
    }

    return (<form className="origin-editor" onSubmit={onSubmit}>
        <Input<Origin> setter={dataSetter} value={data} />
        <SubmitInput label="Save" />
    </form>)
}