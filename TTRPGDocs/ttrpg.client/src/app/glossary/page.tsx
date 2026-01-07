import "./style.css"
import type { Metadata } from "next";
import FormattedText from "@/formatter";
import { GetKeywordData } from "@/Keyword";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Glossary",
};

export default async function GlossaryPage() {
    return (<article>
        <h1>Glossary</h1>

        <div className="glossary">
            {Object.entries(await GetKeywordData()).map(([path, keyword]) => {
                return (<section key={path}>
                    <Link href={keyword.path}>{keyword.name}: </Link>
                    <FormattedText>{keyword.summary}</FormattedText>
                </section>)
            })}
        </div>
    </article>)
}
