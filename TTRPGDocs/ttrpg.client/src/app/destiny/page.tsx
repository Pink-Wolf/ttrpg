import Link from "next/link";
import { Fragment } from "react";
import { getAllDestinies } from "@/data/destiny";

export default async function ArticlePage() {
    const destinies = await getAllDestinies()

    return (<Fragment>
        <h1>List of Destinies</h1>
        <ul>
            {Object.entries(destinies).map(([path, destiny]) => {
                return <li key={path}><Link href={path}>{destiny.name}</Link></li>
            })}
        </ul>
    </Fragment>)
}
