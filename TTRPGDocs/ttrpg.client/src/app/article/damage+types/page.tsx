import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Damage Types",
};

export default function SkillArticle() {
    return (<article>
        <h1>Damage Types</h1>
        The types of damage used by the game are:
        <ul>
            <li key="bludgeoning"><b>Bludgeoning</b> from blunt force trauma.</li>
            <li key="piercing"><b>Piercing</b> from being stapped.</li>
            <li key="slashing"><b>Slashing</b> from being cut.</li>
            <li key="arcane+energy"><b>Arcane Energy</b> from pure arcane magic.</li>
            <li key="cold"><b>Cold</b> from the lack of heat.</li>
            <li key="fire"><b>Fire</b> from heat.</li>
            <li key="poison"><b>Poison</b> from poisons, as well as diseases and viruses.</li>
            <li key="chemical"><b>Chemical</b> from strong acids and bases.</li>
            <li key="lightning"><b>Lightning</b> from electricity.</li>
            <li key="thunder"><b>Thunder</b> from vibrations like sound.</li>
            <li key="psychic"><b>Psychic</b> from attacks against one&apos;s mind.</li>
        </ul>
    </article>)
}
