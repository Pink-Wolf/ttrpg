import Link from "next/link";
import { Fragment } from "react";

export default function ArticlePage() {
    return (<Fragment>
        <h1>List of Articles</h1>
        <ul>
            <li><Link href="article/attributes+and+skills">Attributes and Skills</Link></li>
            <li><Link href="article/dice">Dice Rolling (Resolution Mechanics)</Link></li>
        </ul>
    </Fragment>)
}
