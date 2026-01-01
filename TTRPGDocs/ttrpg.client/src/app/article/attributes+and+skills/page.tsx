import "./style.css"
import { GetAttributes } from "@/data/attributes";
import { GetSkillCategories, GetSkillsFromAttribute } from "@/data/skills";
import type { Metadata } from "next";
import { Fragment } from "react";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import Keyword, { Tooltip } from "@/Keyword";

export const metadata: Metadata = {
    title: "Skills",
};

export default function SkillArticle() {
    return (<article>
        <h1>Attributes and Skills</h1>
        <p> Attributes represents the broad capabilities and natural talents of a character, whereas skills represent the specific areas a character is trained in. </p>


        <section>
            <h2>Attributes</h2>
            <p>
                There are 4 attributes.
                Adventurers have a dice associated with each attribute (one 4-, two 6-, and one 8-sided die).
                The player can roll this dice to achieve actions beyond their usual skill level.
            </p>
            <table className="attribute-table">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {GetAttributes().map(attribute => {
                        return (<tr key={attribute.name} id={attribute.name}>
                            <th>{attribute.name}</th>
                            <td>{attribute.description}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>

        <section>
            <h2>Skills</h2>
            <p>
                The amount of skills is only limited by one&apos;s imagination. There is for example a skill for every tool or craft that one can think of. <br />

                When performing an action, a character may use one of their skills (as appropriate) to succeed at the action.
                Most skills are associated with an attribute, which further helps succeed at an action.
            </p>

            <p>
                A character has a skill if they have at least one level in it, but they can gain more levels in a skill to be able to perform even more difficult actions.
                Each level represents a certain level of proficiency:
            </p>
            <table id="level-description">
                <tbody>
                    <tr><th> 0: </th><td> Unskilled         </td><td> (The level when you do not have the skill)</td></tr>
                    <tr><th> 1: </th><td> Amateur           </td><td> (On equal level with someone who exercises the skill in their spare time) </td></tr>
                    <tr><th> 2: </th><td> Professional      </td><td> (On equal level with someone whose work mainly concerns the use of this skill) </td></tr>
                    <tr><th> 4: </th><td> Expert            </td><td> (On equal level with the greatest in the region) </td></tr>
                    <tr><th> 7: </th><td> Legendary         </td><td> (One of the best in the world) </td></tr>
                    <tr><th> 10: </th><td> Godly             </td><td> (On equal level with miracles performed by gods) </td></tr>
                </tbody>
            </table>
            <p></p>
            <p>
                While there are an infinite number of skills, one will mostly use the following 24 general skills (6 for each attribute):
            </p>
            <table className="skill-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        {GetAttributes().map(attribute => {
                            return (<th key={attribute.name}>{attribute.name}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {GetSkillCategories().map(category => {
                        return (<tr key={category.name} id={betterEncodeURIComponent(category.name)}>
                            <th>{category.name}</th>
                            {Object.values(category.skills).map(skill => {
                                return <td key={skill.name}>{skill.name}<Tooltip>{skill.description}</Tooltip></td>
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>

        <section>
            <h2>General Skill Descriptions</h2>
            <div className="skill-detail-section">
                {GetAttributes().map(attribute => {
                    return (<section key={attribute.name}>
                        <h3>{attribute.name}</h3>
                        {GetSkillsFromAttribute(attribute).map(skill => {
                            return (<Fragment key={skill.name}>
                                <h4 id={betterEncodeURIComponent(skill.name)}>{skill.name}</h4>
                                {skill.description}
                            </Fragment>)
                        })}
                    </section>)
                })}
            </div>
        </section>
    </article>)
}
