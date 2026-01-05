import type { Metadata } from "next";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import Keyword from "@/Keyword";

export const metadata: Metadata = {
    title: "Rest",
};

export default function RestArticle() {
    return (<article>
        <h1>Rest</h1>
        <p>
            Rests are the primary way of undoing the negative effects of adventure.
            Rests are categorized into 3 different types, depending on the length of the rest.
        </p>

        <section>
            <h2 id="short+rest">Short Rest</h2>
            <p>
                An hour of doing nothing taxing. Usually people spend this time sitting around, talking, and perhaps having a meal.
            </p>
            <p>
                After a short rest, if a character has more <Keyword>Damage</Keyword> than <Keyword>Fatigue</Keyword>, then reduce their <Keyword>Damage</Keyword> to their amount of <Keyword>Fatigue</Keyword>.
            </p>
        </section>

        <section>
            <h2 id="long+rest">Long Rest</h2>
            <p>
                6 or more hours of sleep and doing nothing too taxing.
            </p>
            <p>
                This includes a <Keyword>Short_Rest</Keyword> and its boons.
            </p>
            <p>
                A character can only take one long rest per day. <br />
                If a character spends 24 hours without a long rest, then they must each hour succeed at an action to not fall asleep immediately.
                This action uses a level 0 <Keyword>Heart</Keyword> skill, and has a difficulty level of 1 per 24 hours awake.
            </p>
        </section>

        <section>
            <h2 id="downtime+rest">Downtime Rest</h2>
            <p>
                A day of downtime (that is, without adventuring), while staying at a proper house. You must have a proper bed, warmth, and multiple meals throughout the day. This generally cannot be achieved in the wilderness
            </p>
            <p>
                This includes a <Keyword>Long_Rest</Keyword> and its boons.
            </p>
            <p>
                Removes 1 point of <Keyword>Fatigue</Keyword>.
            </p>
        </section>
    </article>)
}
