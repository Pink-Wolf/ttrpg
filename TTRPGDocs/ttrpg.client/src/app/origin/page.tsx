import Link from "next/link";
import { Fragment } from "react";
import { getAllOrigins } from "@/data/origin";

export default async function OriginPage() {
    const origins = await getAllOrigins()

    return (<Fragment>
        <h1>List of Origins</h1>
        <ul>
            {Object.entries(origins).map(([path, origin]) => {
                return <li key={path}><Link href={`/origin/${path}`}>{origin.name}</Link></li>
            })}
        </ul>
    </Fragment>)
}
