import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Player's Character",
};

export default function PlayerArticle() {
    return (<article>
        <h1>Player Character</h1>
        <p>
            Each Player plays a character.
            They control this character&apos;s choices and rolls for the character.
            As these Player Characters gain experiences and grow in level, they gain new abilities, skills, and more.
            These gains are listed below.
        </p>

        <section>
            <h2>Level 1: Creating a Player Character</h2>
            <p>
                At first level, Player Characters gain a Destiny (what other systems usually calls a class) chosen by the Player.
                These destinies provide abilities for the Player Character, both at 1st level and as the character grows in level.
                This is the most defining part of a Player Character, mechanically speaking.
            </p>
            <p>
                At creation, Player Characters gain an Origin (what others systems usually calls a race/ancestry/background), chosen by the Player.
                These Origins denote where the Player Character came from, and their lives before the adventure&apos;s beginning.
            </p>
        </section>
    </article>)
}