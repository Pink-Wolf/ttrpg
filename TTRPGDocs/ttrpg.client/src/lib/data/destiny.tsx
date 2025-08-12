import "@/styles/destiny.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData, postData } from "./getData";
import Ability, { AbilityInput, AbilityViewer } from "./ability";
import FormattedText, { fromCamelCaseToSpaced } from "@/formatter";
import { FormEvent, Fragment } from "react";
import { SmartInput, ArrayInput, BasicInput, FieldInput, SubmitInput, BaseInputProps, RecordAsArrayInput } from "@/Input";

export default interface Destiny {
    name: string;
    summary: string;
    description: string;
    playstyles: DestinyPlaystyle[];
    abilities: Record<string, Ability[]>;
}
export interface DestinyPlaystyle {
    title: string;
    description: string;
}

export async function DestinyViewer({ data }: { data: Destiny }) {
    const destiny = data

    return (<article className="destiny-viewer">
        <h1>{destiny.name}</h1>
        <FormattedText>{destiny.description}</FormattedText>
        <figure className="destiny-playstyle-viewer">
            {destiny.playstyles.map(playstyle => {
                return (<div key={playstyle.title}>
                    <b>{playstyle.title}</b>, <FormattedText>{playstyle.description}</FormattedText>
                </div>)
            })}
        </figure>

        <h2>Abilities</h2>
        <section className="destiny-ability-viewer">
            {Object.entries(destiny.abilities).map((x) => {
                const level = x[0]
                const abilities = x[1] as Ability[]

                return (<section key={level}>
                    <h3>Level {level}:</h3>
                    {abilities.map(ability => {
                        return <AbilityViewer data={ability} key={ability.name} />
                    })}
                </section>)
            })}
        </section>
    </article>)
}

export function getAllDestinies(): Promise<Record<string, Destiny>> {
    return getData<Record<string, Destiny>>("destiny/")
}
export async function getDestiny(name: string): Promise<Destiny> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllDestinies()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find destiny with name ${encodedName}`
        )
        return data
    }
    else return await getData("destiny/" + encodedName)
}

export function postDestiny(data: Destiny): Promise<Response> {
    return postData(`destiny`, data)
}

export function DestinyInput({ value, setter, idPath, label, disabled }: BaseInputProps<Destiny>) {

    const abilityLevelCount = Object.entries(value.abilities).length

    return (<div className="destiny-editor">
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
            field="playstyles"
            fieldInput={props => (<ArrayInput {...props as BaseInputProps<DestinyPlaystyle[]>}
                newValue={() => ({
                    title: "",
                    description: "",
                })}
                forEach={props => {
                    return (<Fragment>
                        <FieldInput {...props}
                            field="title" fieldInput={BasicInput}
                        />
                        <FieldInput {...props}
                            field="description"
                        />
                    </Fragment>)
                }}
            />)}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="abilities" fieldInput={props => RecordAsArrayInput({
                ...props as BaseInputProps<Record<string, Ability[]>>,
                newValue: () => [String(abilityLevelCount + 1), []],
                forEach: props => ArrayInput({
                    ...props,
                    forEach: AbilityInput,
                    newValue: () => ({
                        name: "",
                        description: "",
                    })
                }),
                onlyRemoveLast: true,
                fieldInput: x => <h2>{fromCamelCaseToSpaced(x.value)}</h2>
            })}
        />
    </div>)
}
