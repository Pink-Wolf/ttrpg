import type { Metadata } from "next";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import GetDamageTypes from "@/data/damageTypes";

export const metadata: Metadata = {
    title: "Damage Types",
};

export default function DamageArticle() {
    return (<article>
        <h1>Damage Types</h1>
        The types of damage used by the game are:
        <ul>
            {Object.entries(GetDamageTypes()).map(([, item]) => {
                const path = betterEncodeURIComponent(item.name)
                return <li key={path} id={path}><b>{item.name}</b>{item.description.slice(6)}</li>
            })}
        </ul>
    </article>)
}
