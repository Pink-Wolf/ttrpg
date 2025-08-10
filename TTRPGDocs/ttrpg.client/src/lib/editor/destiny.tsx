'use client'

import { FormEvent, useState } from "react"
import Destiny, { postDestiny } from "@/data/destiny"
import Input, { SubmitInput } from "@/Input"

export default function DestinyEditor({ initialData }: { initialData: Destiny }) {
    const [data, dataSetter] = useState<Destiny>(initialData)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        postDestiny(data)
    }

    return (<form className="destiny-editor" onSubmit={onSubmit}>
        <Input<Destiny> setter={dataSetter} value={data} />
        <SubmitInput label="Save" />
    </form>)
}