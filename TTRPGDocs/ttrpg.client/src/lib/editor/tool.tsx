'use client'

import { FormEvent, useState } from "react"
import Tool, { postTool } from "@/data/tool"
import { SubmitInput } from "@/Input"
import ToolInput from "@/data/ToolInput"

export default function ToolEditor({ initialValue, id }: { initialValue: Tool, id: string }) {
    const [value, setter] = useState<Tool>(initialValue)
    const [processing, setProcessing] = useState<boolean>(false)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setProcessing(true)
        postTool(value).then(() => {
            setProcessing(false)
        }).catch(e => {
            setProcessing(false)
            alert(`Failed to save: ${e}`)
        })
    }

    return (<form onSubmit={onSubmit}>
        <ToolInput value={value} setter={setter} idPath={[id]} label="" disabled={processing} />
        <SubmitInput label="Save" />
    </form>)
}