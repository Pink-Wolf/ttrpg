import "./style.css"
import type { Metadata } from "next";
import Keyword from "@/Keyword";

export default function ActionArticle() {
    return (<article>
        <h1>Actions</h1>
        <p>
            When a character performs an action, the Game Master decides on the difficulty level of that action.
            If the character has an appropriate skill of that level, then the action succeeds.
            If not, then they may still be able to succeed, using that skill&apos;s attribute.
        </p>
        <p>

            If a character acts against another character, then the outcome is determined from the perspective of the one controlled by a player. <br />
            If neither or both is controlled by the player, then it is determined from the perspective of the acting character. <br />
            If both are equally acting, then it is considered two actions.
        </p>

        <h2>Formal Process</h2>
        <section>
            When an action is attemped, then the following process determines its result:
            <ol>
                <li>The Game Master decides on a difficulty level.</li>
                <li>
                    A player decides on a skill of theirs to use (that the Game Master deems appropriate).
                    If they lack any relevant skills, then they are considered using a skill of level 0.
                </li>
                <li>
                    An appropriate attribute is decided as well; This is generally always the attribute associated with the used skill.
                </li>
                <li>
                    The Player rolls their die for the appropriate attribute, and then adds any bonuses to the rolled value.
                </li>
                <li>
                    If the rolled value is at least 4, then the skill is considered one level higher for the outcome of this action. <br />
                    If the rolled value is 8, then go back to step #4 and roll again (to potentially increase the level further).
                    The bonus for this new roll is however much the rolled value exceeded 8 (So no bonus if the rolled value is exactly 8, but for example 4 if the rolled value is 12).
                </li>
                <li>
                    If the skill&apos;s level is less than the difficulty level, then the character fails to perform the action, and a negative consequence may befall them.
                    The character otherwise succeeds at performing the action.
                </li>
                <li>
                    If the skill&apos;s level is above the difficulty level, and the action has a listed bonus, then the bonus is granted for each level beyond the difficulty.
                </li>
            </ol>

            <p>
                If the action succeeds no matter the rolled value, and the action has no listed bonuses, then step #3 and #4 should be skipped.
            </p>

            <p>
                Especially during combat, the negative consequence from failing may simple be the time lost from the action failing.
                The point is just to stop the character from retrying forever until they succeed.
            </p>

            <p>
                Note that simple actions should rarely have any listed bonuses, and actions with a difficulty of 0 should never. <br />
            </p>
        </section>

        <h2>Determining the Difficulty Level</h2>
        <section>
            <p>
                If one character acts against another character, then the difficulty level is the other&apos;s level in an appropriate skill (like <Keyword>Dodge</Keyword>).
            </p>

            <p> If the act is not against another character, then the difficulty level should be set as follows: </p>
            <table id="difficulty-description">
                <tbody>
                    <tr><th> 0:  </th><td> Unskilled         </td><td> (Everyone can always do this action)</td></tr>
                    <tr><th> 1:  </th><td> Amateur           </td><td> (Anyone skilled can consistently do this action) </td></tr>
                    <tr><th> 2:  </th><td> Professional      </td><td> (The expected work of a professional) </td></tr>
                    <tr><th> 4:  </th><td> Expert            </td><td> (Exceptional acts) </td></tr>
                    <tr><th> 7:  </th><td> Legendary         </td><td> (Actions whose difficulty alone makes them worthy to be recorded in stories) </td></tr>
                    <tr><th> 10: </th><td> Godly             </td><td> (On equal level with miracles performed by gods) </td></tr>
                </tbody>
            </table>

            <p> A Game Master may also use the following guidelines to determine the difficulty level based on the adventuring party&apos;s capabilities: </p>
            <table>
                <thead>
                    <tr><th> Difficulty to Succeed </th><th> Difficulty Level </th></tr>
                </thead>
                <tbody>
                    <tr><th> Easy           </th><td> One below the characters&apos; level. </td></tr>
                    <tr><th> Medium         </th><td> Equal to the characters&apos; level. </td></tr>
                    <tr><th> Hard           </th><td> One above the characters&apos; level. </td></tr>
                    <tr><th> Extremely Hard </th><td> Two above the characters&apos; level. </td></tr>
                </tbody>
            </table>
        </section>
    </article>)
}

export const metadata: Metadata = {
    title: "Dice",
};
