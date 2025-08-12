import "@/styles/ability.css"
import FormattedText, { fromCamelCaseToSpaced, toTitleCase, upperCaseFirstLetter } from "@/formatter";
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { BaseInputProps, BasicInput, FieldInput, OptionalInput } from "@/Input";

export default interface Ability {
    name: string;
    description: string;
    frequency?: string;
    actions?: string;
    reaction?: string;
    target?: string;
    skill?: string;
    bonus?: string;
    consequences?: AbilityConsequence;
}
export interface AbilityConsequence {
    minor: string;
    medium: string;
    major: string;
}

export async function AbilityViewer({ data }: { data: Ability }) {
    const ability = data

    const fields = Object.keys(data).filter(field => {
        return !(["name", "consequences", "description"].includes(field))
    })
    const consequences = ability.consequences

    return (<figure className="ability-viewer" id={betterEncodeURIComponent(ability.name)}>
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>{ability.name}</th>
                </tr>
            </thead>
            <tbody>
                {fields.map(field => {
                    return (<tr key={field}>
                        <th>{toTitleCase(field)}</th>
                        <td><FormattedText>
                            {ability[field as keyof Ability] as string}
                        </FormattedText></td>
                    </tr>)
                })}
                <tr key="consequences" hidden={consequences === undefined}>
                    <th>Consequences</th>
                    <td>
                        {consequences === undefined
                            ? []
                            : Object.keys(consequences).map(severity => {
                                return (<FormattedText key={severity}>
                                    **{upperCaseFirstLetter(severity)}:** {consequences[severity as keyof AbilityConsequence]}
                                </FormattedText>)
                            })
                        }
                    </td>
                </tr>
                <tr key="description">
                    <td colSpan={2}>
                        <FormattedText>{ability.description}</FormattedText>
                    </td>
                </tr>
            </tbody>
        </table>
    </figure>)
}

export function AbilityInput({ value, setter, idPath, label, disabled }: BaseInputProps<Ability>) {
    return (<div className="ability-editor">
        <h3>{label ?? fromCamelCaseToSpaced(idPath[idPath.length - 1])}</h3>

        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="name" fieldInput={BasicInput}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="description"
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="frequency" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="actions" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="reaction" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="target" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="skill" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="bonus" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="consequences" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => ({
                    minor: "",
                    medium: "",
                    major: "",
                }),
            })}
        />
    </div>)
}
