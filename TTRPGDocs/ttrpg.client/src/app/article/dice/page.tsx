import type { Metadata } from "next";

export default function DiceArticle() {
    return (<article>
        <h1>Dice Rolling</h1>
        <p>When the outcome of an action is uncertain, a Player or Game Master can roll to determine the outcome.</p>

        <p>When rolling, you roll a 12-sided die, where 11 is replaced with vice and 12 is replaced with virtue. The result of a vice- or virtue-roll depends on the action.</p>
        <p>
            If an action intentionally kills or severely harms a living creature, or intentionally helps the god of vice, then that action is considered a &quot;vice&quot; action. <br />
            For non-vice actions, rolling vice is considered a -10, while rolling virtue is considered a 20. <br />
            For vice actions, rolling virtue is considered a -10, while rolling vice is considered a 20. <br />
        </p>

        <p>
            A character may chose to use a skill they have to do the action (if the Game Master deems it appropriate); if no skill is used, the Game Master choses an attribute to use instead. <br />
            After rolling the dice, add the character&apos;s score in the used skill/attribute to the rolled value. <br />
            The action may have various other bonuses or penalties that one should also add to the rolled value. <br />
        </p>

        <p>
            The action has a difficulty-value. If the rolled value (after adding bonuses and penalties) is less than the difficulty-value, then a consequence is brought upon the acting character. <br />
            The consequence is minor if the difference is at most 5; a difference of 6-10 results in a medium consequence; finally, a difference above 10 results in a major consequence. <br />
            If the rolled value is 5 above the difficulty-value, and for every additional 5 above, a bonus is added to the action. <br />
        </p>

        <p>
            The specific consequence or bonus applying to an action is up to the Game Master.
            The Game Master may decide on none despite a high or low roll (if none makes sense for the situation; though a Game Master should consider not asking for a roll then).
            Typically, actions have listed consequences or bonuses; A Game Master should almost always use these, especially during combat.
        </p>
    </article>)
}

export const metadata: Metadata = {
    title: "Dice",
};
