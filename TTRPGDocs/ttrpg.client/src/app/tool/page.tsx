import Link from "next/link";
import { Fragment } from "react";
import { getAllTools } from "@/data/tool";

export default async function ToolPage() {
    const tools = await getAllTools()

    return (<Fragment>
        <h1>List of Tools</h1>
        <ul>
            {Object.entries(tools).map(([path, tool]) => {
                return <li key={path}><Link href={`/tool/${path}`}>{tool.name}</Link></li>
            })}
        </ul>
    </Fragment>)
}
