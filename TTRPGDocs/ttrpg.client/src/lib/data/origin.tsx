import "@/styles/origin.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData } from "./getData";
import Ability, { AbilityViewer } from "./ability";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Fragment } from "react";
import { toTitleCase } from "@/formatter";

const ORIGIN_URL_PATH = `origin/`

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
        <MDXRemote source={origin.description} />

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
                            <th>{toTitleCase(attribute)}</th>
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
                        <b>{toTitleCase(skill)}</b>: {level}
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
    return getData<Record<string, Origin>>(ORIGIN_URL_PATH)
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
    else return await getData(ORIGIN_URL_PATH + encodedName)
}
