'use client'

import { useState } from "react"
import Origin, { OriginForm, postOrigin } from "@/data/origin"

export default function OriginEditor({ initialData }: { initialData: Origin }) {
    const [data, dataSetter] = useState<Origin>(initialData)

    function onSubmit() {
        postOrigin(data)
    }

    return <OriginForm data={data} dataSetter={dataSetter} onSubmit={onSubmit} />
}