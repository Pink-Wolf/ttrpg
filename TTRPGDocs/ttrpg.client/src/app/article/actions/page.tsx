import type { Metadata } from "next";
import Keyword from "@/Keyword";

export default function ActionArticle() {
    return (<article>
        <h1>Actions</h1>
        <p>
            When performing an action, whether it succeeds depends on its difficulty and the skills of the acting character.
        </p>
        <p>
            If a character acts against another character, then the outcome is determined only from the perspective of the acting character. <br />
            If only one of these characters are controlled by a Player, then they are considered the acting character
            (even if the action is then to react and defend).
        </p>

        <h2>Formal Process</h2>
        <section>
            <p>
                To determine the outcome of an action attempted, then a difficulty and acting level is determined.
                The action succeeds when the acting level is at least as great as the difficulty level.
                The exact process is as follows:
            </p>
            <ol>
                <li>When an action is to be performed, the Game Master decides on a difficulty level.</li>
                <li>
                    A player decides on a skill of theirs to use (that the Game Master deems appropriate).
                    Their acting level is equal to their level in this skill.
                    If they lack any relevant skills, then their acting level is 0.
                </li>
                <li>
                    An appropriate attribute is decided as well; This is generally always the attribute associated with the used skill.
                </li>
                <li>
                    The Player rolls their die for the appropriate attribute, and then adds any bonuses to the rolled value.
                </li>
                <li>
                    If the rolled value is at least 4, then the acting level is increased by 1. <br />
                    If the rolled value is 8, then go back to step #4 to roll again.
                    The bonus for this new roll is however much the rolled value exceeded 8 (So no bonus if the rolled value is 8, but 4 if the rolled value is 12).
                </li>
                <li>
                    If the acting level is less than the difficulty level, then the character fails to perform the action, and a negative consequence may befall them. <br />
                    The character otherwise succeeds at performing the action.
                    If the acting level is beyond the difficulty level, then a bonus may be included for each level beyond the difficulty.
                </li>
            </ol>

            <p>
                Step 3 should be skipped if it would not change the outcome,
                whether because the acting level is already great enough (and there are no additional bonuses to achieve),
                or it is much too low for the character to ever succeed (and its negative consequence would not change by the roll).
            </p>

            <p>
                Especially during combat, the negative consequence may simple be the time lost from the action failing.
                The point is just to stop the character from retrying forever until they succeed.
            </p>

            <p>
                When a character should gain a positive bonus from overachieving, then that bonus is usually explicitly described in the rules.
                Simple actions may often not have any bonuses, and actions with a difficulty of 0 should never.
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

        </section>

    </article>)
}

export const metadata: Metadata = {
    title: "Dice",
};
