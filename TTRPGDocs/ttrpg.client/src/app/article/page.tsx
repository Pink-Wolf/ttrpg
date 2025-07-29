import Link from "next/link";
import { Fragment } from "react";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";

export function getArticles(): string[] {
    return [
        "Attributes and Skills",
        "Dice",
    ]
}

export default function ArticlePage() {
    return (<Fragment>
        <h1>List of Articles</h1>
        <ul>
            {getArticles().map((name) => {
                return <li key={name}><Link href={`article/${betterEncodeURIComponent(name)}`}>{name}</Link></li>
            })}
        </ul>
    </Fragment>)
}
