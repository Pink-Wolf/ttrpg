import type { Metadata } from "next";
import Keyword from "@/Keyword";

export default function DiceArticle() {
    return (<article>
        <h1>Dice Rolling</h1>
        <p>When the outcome of an action is uncertain, a Player or Game Master can roll to determine the outcome.</p>

        <h2>Rolling</h2>

        <section>
            <p>When rolling, you roll a 12-sided die, where 11 is replaced with vice and 12 is replaced with virtue. The result of a vice- or virtue-roll depends on the action.</p>
            <p>
                If an action intentionally kills or severely harms a living creature, intentionally helps the god of vice, then that action is considered a &quot;vice&quot; action. <br />
                For non-vice actions, rolling vice is considered a -5, while rolling virtue is considered a 15. <br />
                For vice actions, rolling virtue is considered a -5, while rolling vice is considered a 15. <br />
            </p>
        </section>

        <section>
            <p>
                At the start of a session, Players&apos; characters are awarding one &quot;vice&quot; point, and then one &quot;virtue&quot; point.
                When a Player makes a sacrificial choice, that is one that helps others but harms their character, the Game Master may award their character a virtue point as well. <br />
                Before the outcome of an action is finished being narrated and the play moves along, a Player may use their character&apos;s virtue or vice points to reroll the dice, taking the new rolled value if they so wish. <br />
                Players may not use virtue points on vice actions, nor vice points on non-vice actions. <br />
                A character may not use vice or virtue points to reroll a dice already rerolled by using a vice or virtue point. <br />
                If a character has 3 virtue and vice points, then they cannot be awarded another point. <br />
            </p>
        </section>

        <section>
            <p>
                A character may chose to use a skill to do an action (if the Game Master deems it appropriate); if no skill is used, then the Game Master choses an attribute to use instead. <br />
                After rolling the dice, add the character&apos;s score in the used skill/attribute to the rolled value. <br />
            </p>

            <p>
                The action may have various bonuses or penalties that one should add to the rolled value. <br />
            </p>
        </section>

        <h2>Result</h2>
        <section>
            <p>
                The action has a difficulty-value. If the rolled value (after adding bonuses and penalties) is less than the difficulty-value, then a consequence is brought upon the acting character. <br />
                The consequence is minor if the difference is at most 5; a difference of 6-10 results in a medium consequence; finally, a difference above 10 results in a major consequence. <br />
                If the rolled value is 5 above the difficulty-value, and for every additional 5 above, a bonus is added to the action. <br />
            </p>
            </section>

        <section>
            <p>
                The specific consequence or bonus applying to an action is up to the Game Master, and they may decide that none makes sense for the action. <br />
                Typically, actions have listed consequences or bonuses; A Game Master should almost always use these, especially during combat.
                Otherwise, the following guidelines can be used:
            </p>
            <ul>
                <li>Minor consequences usually allows the action to succeed partly (at around 50% to 75%).</li>
                <li>Medium consequences negates the action and stops the character from just trying again (by for example introducing a problem the character has to deal with first).</li>
                <li>Major consequences negates the action and pushes the character away from their desired goal by a magnitude equivalent to the action.</li>
            </ul>
        </section>

        <h2>Determining the Difficulty-Value</h2>

        <section>
            <p>
                When rolling against a skill, like a combatant&apos;s <Keyword>Dodge</Keyword>, the difficulty-value is simply 5+the skill&apos;s level.
                For example, when rolling against a level 3 <Keyword>Dodge</Keyword>, one has to roll 5+3=8.
            </p>
            <p>
                If the target character does not have the given skill, then the difficulty value is simply 5.
                The target&apos;s attributes are therefore ignored.
            </p>
        </section>

        <section>
            <p>
                For most environmental challenges, the Game Master can determine the difficulty-value based on the expected proficiency like so:
            </p>
            <table id="proficiency-difficulty">
                <thead>
                    <tr>
                        <th>Expected Proficiency to Perform the Action</th>
                        <th>Difficulty-Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Unskilled</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Trained</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Expert</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>Master</td>
                        <td>25</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <p>
                When the Game Master wants the challenge to match the player characters&apos; level,
                or has no other way of determining the difficulty-value,
                then the difficulty-value can be determined based on the following graph:
            </p>
            <table id="level-difficulty">
                <thead>
                    <tr>
                        <th>Lowest Characters&apos; level</th>
                        <th>Difficulty-Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td> 5</td></tr>
                    <tr><td>2</td><td> 7</td></tr>
                    <tr><td>3</td><td>10</td></tr>
                    <tr><td>4</td><td>12</td></tr>
                    <tr><td>5</td><td>15</td></tr>
                    <tr><td>6</td><td>17</td></tr>
                    <tr><td>7</td><td>20</td></tr>
                    <tr><td>8</td><td>22</td></tr>
                    <tr><td>9</td><td>25</td></tr>
                </tbody>
            </table>
        </section>

        <h2>Contested Rolls</h2>
        <section>
            <p>
                If one character acts against another character, then only the acting character rolls (usually against one of the targeted character&apos;s skills).
                The Game Master may decide to instead have the Players&apos; characters also roll when being targeted (for example, rolling <Keyword>Dodge</Keyword> when attacked by a sword).
            </p>
            <p>
                If 2 characters are acting equally, for example if they are armwrestling each other, then both roll.
                After the rolled value of the 2 characters have been determined, then consider the higher as the actually rolled value, and consider the lower as the difficulty-value.
                If both rolls the same, then the result is a tie (which may simply lead to the action continuing with another roll).
            </p>
        </section>

    </article>)
}

export const metadata: Metadata = {
    title: "Dice",
};
