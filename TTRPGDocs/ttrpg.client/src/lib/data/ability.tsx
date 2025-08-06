import "@/styles/ability.css"
import FormattedText, { toTitleCase, upperCaseFirstLetter } from "@/formatter";

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

export function AbilityViewer({ data }: { data: Ability }) {
    const ability = data

    const fields = Object.keys(data).filter(field => {
        return !(["name", "consequences", "description"].includes(field))
    })
    const consequences = ability.consequences

    return (<figure className="ability-viewer">
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
                                return (<p key={severity}>
                                    <b>{upperCaseFirstLetter(severity)}: </b>
                                    <FormattedText>
                                        {consequences[severity as keyof AbilityConsequence]}
                                    </FormattedText>
                                </p>)
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
