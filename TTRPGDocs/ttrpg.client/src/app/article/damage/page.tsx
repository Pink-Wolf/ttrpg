import type { Metadata } from "next";
import { GetDamageTypes } from "@/data/damageTypes";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import Keyword from "@/Keyword";

export const metadata: Metadata = {
    title: "Damage",
};

export default function DamageArticle() {
    return (<article>
        <h1>Damage and Endurance</h1>
        <p>
            Throughout an adventure, characters slowly gain <Keyword>Fatigue</Keyword>. <Keyword>Fatigue</Keyword> is only removed when resting in a proper bed, which can hardly be found out in the wilderness. <br />
            <Keyword>Fatigue</Keyword> does not harm a character directly, but does make it easier to fall to damage.
        </p>
        <p>
            During an encounter, characters often receive damage.
            Damage can easily be removed by taking a short rest, but only down to the amount of <Keyword>Fatigue</Keyword> that a character has accumulated. <br />
            If a Character has more Damage than <Keyword>Endurance</Keyword>, then the character is <Keyword>KnockedOut</Keyword>, stopping them from acting.
        </p>
        <p>
            The default <Keyword>Endurance</Keyword> of adventurers are 10.
        </p>

        <section>
            <h2>Damage Types</h2>
            <p>
                The types of damage are:
            </p>
            <ul>
                {GetDamageTypes().map(item => {
                    const path = betterEncodeURIComponent(item.name)
                    return <li key={path} id={path}><b>{item.name}</b>{item.description.slice(6)}</li>
                })}
            </ul>
        </section>
    </article>)
}
