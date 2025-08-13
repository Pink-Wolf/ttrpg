import Link from "next/link";
import { Fragment } from "react";
import { getAllDestinies } from "@/data/destiny";
import NewDestinyButton from "@/editor/NewDestinyButton";

export default async function DestinyPage() {
    const destinies = await getAllDestinies()

    return (<Fragment>
        <h1>List of Destinies</h1>
        <ul>
            {Object.entries(destinies).map(([path, destiny]) => {
                return <li key={path}><Link href={`/destiny/${path}`}>{destiny.name}</Link></li>
            })}
            {process.env.INCLUDE_EDITOR !== `1` ? `` : (<li>
                <NewDestinyButton />
            </li>)}
        </ul>
    </Fragment>)
}
