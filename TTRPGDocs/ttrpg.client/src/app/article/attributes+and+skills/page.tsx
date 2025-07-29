import "./style.css"
import type { Metadata } from "next";

export default function SkillArticle() {
    return (<article>
        <h1>Attributes and Skills</h1>
        <p>Attributes are the broad capabilities and natural talents of a character, whereas skills are the specific areas a character has trained.</p>

        <section>
            <p> There are 5 attributes: </p>
            <table id="attribute-table">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Physique</th>
                        <td>The physical strength and constitution of a character&apos;s body.</td>
                    </tr>
                    <tr>
                        <th>Wits</th>
                        <td>The quick-thinking and dexterity of a character.</td>
                    </tr>
                    <tr>
                        <th>Intellect</th>
                        <td>The scholarly knowledge and reasoning of a character.</td>
                    </tr>
                    <tr>
                        <th>Charisma</th>
                        <td>The societal knowledge and charms of a character.</td>
                    </tr>
                    <tr>
                        <th>Heart</th>
                        <td>The mental health, religious knowledge, and empathy of a character.</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <p>
                The amount of skills is only limited by one&apos;s imagination. There is for example one skill for every tool or niche one can think of. <br />
                Most skills have an associated attribute; if a character has one of these skills, then they add their score in that attribute to the skill&apos;s score. <br />
                While there are an infinite number of skills, one will mostly use the following 25 general skills (5 for each attribute):
            </p>
            <table id="skill-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Physique</th>
                        <th>Wits</th>
                        <th>Intellect</th>
                        <th>Charisma</th>
                        <th>Heart</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Social</th>
                        <td>Awe</td>
                        <td>Trickery</td>
                        <td>Reason</td>
                        <td>Charm</td>
                        <td>Rally</td>
                    </tr>
                    <tr>
                        <th>Movement</th>
                        <td>Athletics</td>
                        <td>Stealth</td>
                        <td>Navigate</td>
                        <td>Perform</td>
                        <td>Travel</td>
                    </tr>
                    <tr>
                        <th>Knowledge</th>
                        <td>Body</td>
                        <td>Nature</td>
                        <td>Lore</td>
                        <td>Society</td>
                        <td>Religion</td>
                    </tr>
                    <tr>
                        <th>Perception</th>
                        <td>Track</td>
                        <td>Search</td>
                        <td>Study</td>
                        <td>Insight</td>
                        <td>Awareness</td>
                    </tr>
                    <tr>
                        <th>Creation</th>
                        <td>Crafting</td>
                        <td>Brewing</td>
                        <td>Arcane</td>
                        <td>Storytelling</td>
                        <td>Healing</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>General Skill Descriptions</h2>
            <div id="skill-detail-section">
                <section>
                    <h3>Physique</h3>
                    <h4>Awe</h4>
                    The apparent strength of the character. This awe can inspire respect, hope in allies, and fear in opponents.
                    <h4>Athletics</h4>
                    The ability to perform deeds requiring physical strength or a high stamina.
                    <h4>Body</h4>
                    Understanding and training of the body helps primarily when dealing with severe physical injuries and resisting poisons.. as well as strong alchohol.
                    <h4>Track</h4>
                    When following a trail, whether during a hunt or in search of an escaped prisoner, track allows one to keep track of the path the target took.
                    <h3>Crafting</h3>
                    By hand or tool, crafting sculptures of stone or weapons of metal, this skill covers the arts requiring a strong hand, especially ones where function matters more than appearance.
                </section>

                <section>
                    <h3>Wits</h3>
                    <h4>Trickery</h4>
                    The art of deception and manipulation, sharing only what is convenient for the other party to hear.
                    <h4>Stealth</h4>
                    To remain hidden, or perform unseen actions, stealth keeps your presence and acts unknown to others.
                    <h4>Nature</h4>
                    Knowledge of plants and animals, of what plants to combine to heal a burn, or where best to scratch a cat, you will hardly find someone who could not use more knowledge of nature.
                    <h4>Search</h4>
                    Finding secrets and loot in a location or on an uncouncious body, search is a prime skill for treasure hunters.
                    <h3>Brewing</h3>
                    Whether cooking a healthy dinner, or combining some berries to make a deadly toxin, brewing is a natural skill often decried as witchcraft.
                </section>

                <section>
                    <h3>Intellect</h3>
                    <h4>Reason</h4>
                    The ability to use logic to explain why you are always right.
                    <h4>Navigate</h4>
                    Whether by use of the stars or a map, the ability to locate your current position and orientation.
                    <h4>Lore</h4>
                    While some may be skilled in specific fields, this skill covers a general and random collection of knowledge spanning history and the fundamental nature of the world.
                    <h4>Study</h4>
                    Whether it be studying books for their knowledge, or experimenting on an object to learn of its function, this skill is invaluable for the scholarly folk.
                    <h3>Arcane</h3>
                    The ability to cast spells and enchant tools, as well as understanding these spells and enchantments.
                </section>

                <section>
                    <h3>Charisma</h3>
                    <h4>Charm</h4>
                    The plain old skill of making someone want to help you and be your friend.
                    <h4>Perform</h4>
                    Through movements that seems like illusions, this skill allows you to dazzle and confuse your viewers.
                    <h4>Society</h4>
                    Knowing what to say when, or the big picture consequences of a daring action, now that is how you win the game of politics.
                    <h4>Insight</h4>
                    Understanding the words unspoken, or the intentions hidden away, insight is the opponent of other&apos;s trickery, whether intentional or not.
                    <h3>Storytelling</h3>
                    To craft stories, songs, myths and poems, to control people&apos;s emotion with nothing but words, it is hard to believe it is not arcane magic.
                </section>

                <section>
                    <h3>Heart</h3>
                    <h4>Rally</h4>
                    To boost someone&apos;s mood, to remove the darkness in their soul, to light the flame of heroism in the most unlikely places, that is the heart of any adventuring group.
                    <h4>Travel</h4>
                    Travelling for days with little going on is surprisingly hard.
                    To keep track of rations, to keep spirits high, to make sure noone falls behind, there is a lot to do which this skill helps with.
                    <h4>Religion</h4>
                    Whether it be the scholarly understanding of the world&apos;s gods, or how communities have formed around these powerful concepts, religion is a powerful force for connecting with and inspiring people.
                    <h4>Awareness</h4>
                    A constant sense of what is going on, especially from the corner of one&apos;s eye. This awareness helps avoid surprises like an ambush or trap.
                    <h3>Healing</h3>
                    While healing includes the use of medicine to treat physical injuries, this skill is just as much about the treatment of mental injuries.
                </section>
            </div>
        </section>
    </article>)
}

export const metadata: Metadata = {
    title: "Dice",
};
