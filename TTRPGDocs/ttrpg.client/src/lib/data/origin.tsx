import "@/styles/origin.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData, postData } from "./getData";
import Ability, { AbilityInput, AbilityViewer } from "./ability";
import { Fragment } from "react";
import FormattedText, { fromCamelCaseToSpaced, toTitleCase } from "@/formatter";
import Keyword from "@/Keyword";
import { ArrayInput, BaseInputProps, BasicInput, FieldInput, OptionalInput, RecordAsArrayInput } from "@/Input";

export default interface Origin {
    name: string;
    summary: string;
    description: string;
    attributes?: Record<string, string>;
    skills?: Record<string, string>;
    abilities?: Ability[];
    suborigins?: Origin[];
}

async function InnerOriginViewer(origin: Origin) {
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
                    return <li key={suborigin.name} id={betterEncodeURIComponent(suborigin.name)}>{InnerOriginViewer(suborigin)}</li>
                })}
            </ul>
        </section>
    </Fragment>)
}
export async function OriginViewer({ data }: { data: Origin }) {
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

export function postOrigin(data: Origin): Promise<Response> {
    return postData(`origin`, data)
}

export function OriginInput({ value, setter, idPath, label, disabled }: BaseInputProps<Origin>) {
    return (<div className="origin-editor">
        <h3>{label ?? fromCamelCaseToSpaced(idPath[idPath.length - 1])}</h3>

        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="name" fieldInput={BasicInput}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="summary" fieldInput={BasicInput}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="description"
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="attributes" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => ({}),
                definedInput: props => RecordAsArrayInput({
                    ...props as BaseInputProps<Record<string, string>>,
                    forEach: BasicInput,
                    newValue: () => ["", ""] as [string, string],
                    fieldInput: BasicInput,
                })
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="skills" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => ({}),
                definedInput: props => RecordAsArrayInput({
                    ...props as BaseInputProps<Record<string, string>>,
                    forEach: BasicInput,
                    newValue: () => ["", ""] as [string, string],
                    fieldInput: BasicInput,
                })
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="abilities" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => [],
                definedInput: props => ArrayInput({
                    ...props as BaseInputProps<Ability[]>,
                    forEach: AbilityInput,
                    newValue: () => ({
                        name: "",
                        description: "",
                    })
                })
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="suborigins" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => [],
                definedInput: props => ArrayInput({
                    ...props as BaseInputProps<Origin[]>,
                    forEach: OriginInput,
                    newValue: () => ({
                        name: "",
                        summary: "",
                        description: "",
                    })
                })
            })}
        />
    </div>)
}
