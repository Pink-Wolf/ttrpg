import Link from "next/link";
import { Fragment } from "react";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import getArticleNames from "./getArticleNames";

export default function ArticlePage() {
    return (<Fragment>
        <h1>List of Articles</h1>
        <ul>
            {getArticleNames().map((name) => {
                return <li key={name}><Link href={`article/${betterEncodeURIComponent(name)}`}>{name}</Link></li>
            })}
        </ul>
    </Fragment>)
}
