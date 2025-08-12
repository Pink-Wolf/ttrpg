import { GetAttributes } from "@/data/attributes";
import { GetSkillCategories, GetSkillsFromAttribute } from "@/data/skills";
import "./page.module.css"
import type { Metadata } from "next";
import { Fragment } from "react";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";

export const metadata: Metadata = {
    title: "Skills",
};

export default function SkillArticle() {
    return (<article>
        <h1>Attributes and Skills</h1>
        <p>Attributes are the broad capabilities and natural talents of a character, whereas skills are the specific areas a character has trained.</p>

        <section>
            <p> There are 4 attributes: </p>
            <table id="attribute-table">
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
            <p>
                The amount of skills is only limited by one&apos;s imagination. There is for example one skill for every tool or niche one can think of. <br />
                Most skills have an associated attribute; if a character has one of these skills, then they add their score in that attribute to the skill&apos;s score. <br />
                While there are an infinite number of skills, one will mostly use the following 24 general skills (6 for each attribute):
            </p>
            <table id="skill-table">
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
                                return <td key={skill.name}>{skill.name}</td>
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>

        <section>
            <h2>General Skill Descriptions</h2>
            <div id="skill-detail-section">
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
