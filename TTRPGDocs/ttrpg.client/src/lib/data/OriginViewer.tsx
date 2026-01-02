import { Fragment } from "react"
import betterEncodeURIComponent from "@/betterEncodeURIComponent"
import FormattedText from "@/formatter"
import Origin from "./origin"
import { AbilityViewer } from "./AbilityViewer"
import Keyword from "@/Keyword"

async function InnerOriginViewer(origin: Origin) {
    return (<Fragment>
        <h1>{origin.name}</h1>
        <FormattedText>{origin.description}</FormattedText>

        <section hidden={origin.skills === undefined}>
            Gain the following skills:
            <ul>
                {Object.entries(origin.skills ?? {}).map(([skill, level]) => {
                    return (<li key={skill}>
                        <FormattedText>**{skill}**: {level}</FormattedText>
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
                    return <li key={suborigin.name} id={betterEncodeURIComponent(suborigin.name)}>{InnerOriginViewer(suborigin)}</li>
                })}
            </ul>
        </section>
    </Fragment>)
}
export default async function OriginViewer({ data }: { data: Origin }) {
    const origin = data

    return (<article className="origin-viewer">{InnerOriginViewer(origin)}</article>)
}
