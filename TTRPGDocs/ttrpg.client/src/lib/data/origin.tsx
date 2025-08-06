import "@/styles/origin.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData } from "./getData";
import Ability, { AbilityViewer } from "./ability";
import { Fragment } from "react";
import FormattedText, { toTitleCase } from "@/formatter";
import Keyword from "../Keyword";

export default interface Origin {
    name: string;
    description: string;
    attributes?: Map<string, string>;
    skills?: Map<string, string>;
    abilities?: Ability[];
    suborigins?: Origin[];
}

function InnerOriginViewer(origin: Origin) {
    return (<Fragment>
        <h1>{origin.name}</h1>
        <FormattedText>{origin.description}</FormattedText>

        <section hidden={origin.attributes === undefined}>
            Gain the following levels in the denoted attributes:
            <table id="origin-attribute-table">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(origin.attributes ?? {}).map(([attribute, level]) => {
                        return (<tr key={attribute}>
                            <th><Keyword>{toTitleCase(attribute)}</Keyword></th>
                            <td>{level}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </section>

        <section hidden={origin.skills === undefined}>
            Gain the following skills:
            <ul>
                {Object.entries(origin.skills ?? {}).map(([skill, level]) => {
                    return (<li key={skill}>
                        <b><Keyword>{toTitleCase(skill)}</Keyword></b>: {level}
                    </li>)
                })}
            </ul>
        </section>

        <section hidden={origin.abilities === undefined}>
            Gain the following abilities:
            <section className="origin-ability-viewer">
                {(origin.abilities ?? []).map(ability => {
                    return <AbilityViewer data={ability} key={ability.name} />
                })}
            </section>
        </section>

        <section hidden={origin.suborigins === undefined}>
            <h2>Suborigins</h2>
            As part of this origin, choose one of the following suborigins to get:
            <ul className="origin-viewer">
                {(origin.suborigins ?? []).map(suborigin => {
                    return <li key={suborigin.name}>{InnerOriginViewer(suborigin)}</li>
                })}
            </ul>
        </section>
    </Fragment>)
}
export function OriginViewer({ data }: { data: Origin }) {
    const origin = data

    return (<article className="origin-viewer">{InnerOriginViewer(origin)}</article>)
}

export function getAllOrigins(): Promise<Record<string, Origin>> {
    return getData<Record<string, Origin>>("origin/")
}
export async function getOrigin(name: string): Promise<Origin> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllOrigins()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find origin with name ${encodedName}`
        )
        return data
    }
    else return await getData("origin/" + encodedName)
}
