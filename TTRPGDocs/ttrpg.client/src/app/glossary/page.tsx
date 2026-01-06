import "./style.css"
import type { Metadata } from "next";
import FormattedText from "@/formatter";
import { GetKeywordData } from "@/Keyword";

export const metadata: Metadata = {
    title: "Glossary",
};

export default async function GlossaryPage() {
    return (<article>
        <h1>Glossary</h1>

        <div className="glossary">
            {Object.entries(await GetKeywordData()).map(([path, keyword]) => {
                return (<FormattedText key={path}>
                    **{keyword.name}**: {keyword.summary}
                </FormattedText>)
            })}
        </div>
    </article>)
}
