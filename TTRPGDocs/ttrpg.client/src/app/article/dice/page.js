export default async function ArticlePage(input) {
    return (<article>
        <h1>Dice Rolling</h1>
        <p>When the outcome of an action is uncertain, a Player or Game Master can roll to determine the outcome.</p>

        <p>When rolling, you roll a 12-sided die, where 11 is replaced with vice and 12 is replaced with virtue. The result of a vice- or virtue-roll depends on the action.</p>
        <p>
            &quotVice&quot actions are actions that intentionally kills or severely harms a living creature, and actions that intentionally helps the god of vice.
            For non-vice actions, vice is considered a -9, while virtue is considered a 20.
            For vice actions, virtue is considered a -9, while vice is considered a 20.
        </p>

        <p>After rolling the dice, if the action has an associated skill that the acting character has, add that character&aposs skill-value to the rolled value.</p>

        <p>The action may have various other bonuses or penalties that one should add to the rolled value.</p>

        <p>
            The action has a difficulty-value. If the rolled value is at most 4 below the difficulty-value, then the action succeeded.
            If the roll is below the difficulty-value, then a consequence is brought upon the acting character. This consequence is major if the difference is at least 8.
            If the rolled value is 4 above the difficulty-value, and for every additional 4 above, a bonus is added to the action.
        </p>

        <p>The specific consequence or bonus is up to the Game Master, and they may decide on none (if none makes sense for the situation). Typically, actions have listed default consequences or bonuses for the Game Master to use.</p>
    </article>)
}

export async function generateMetadata(input) {
    return {
        title: "Dice Rolling",
    }
}
