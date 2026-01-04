import "./style.css"
import type { Metadata } from "next";
import { GetConditions } from "@/data/condition";
import FormattedText from "@/formatter";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";

export const metadata: Metadata = {
    title: "Conditions",
};

export default function DamageArticle() {
    return (<article>
        <h1>Conditions</h1>

        <div className="condition-list">
            {GetConditions().map(condition => {
                const path = betterEncodeURIComponent(condition.name)
                return (<section key={condition.name}>
                    <h3 id={path}>{condition.name}</h3>
                    <FormattedText>{condition.description}</FormattedText>
                </section>)
            })}
        </div>
    </article>)
}
