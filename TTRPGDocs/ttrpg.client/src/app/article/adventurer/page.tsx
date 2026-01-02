import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Player's Character",
};

export default function PlayerArticle() {
    return (<article>
        <h1>Adventurer</h1>
        <p>
            Each Player plays a character, called an &quot;Adventurer&quot;.
            The Player control this adventurer&apos;s choices and rolls for them.
            As these adventurers gain experiences and grow in level, they gain new abilities, skills, and more.
            These gains are listed below.
        </p>

        <section>
            <h2>Level 1: Creating an adventurer</h2>
            <p>
                Adventurers gain a <Link href="/destiny">Destiny</Link> (what other systems usually calls a class) chosen by the Player.
                These destinies provide abilities for the Player Character, both at 1st level and as the character grows in level.
                This is the most defining part of a Player Character, mechanically speaking.
            </p>
            <p>
                Adventurers gain an <Link href="/origin">Origin</Link> (what others systems usually calls a race/ancestry/background), chosen by the Player.
                These Origins denote where the Player Character came from, and their lives before the adventure&apos;s beginning.
            </p>
            <p>
                Adventurers have an 8-sided, two 6-sided, and one 4-sided die to distribute among their attributes. The player decides this distribution.
            </p>
        </section>
    </article>)
}