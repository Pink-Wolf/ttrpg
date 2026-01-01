import betterEncodeURIComponent from "@/betterEncodeURIComponent"
import FormattedText, { toTitleCase } from "@/formatter"
import Ability from "./ability"

export async function AbilityViewer({ data }: { data: Ability }) {
    const ability = data

    const fields = Object.keys(ability).filter(field => {
        return !(["name", "consequences", "description"].includes(field))
    })

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
                <tr key="description">
                    <td colSpan={2}>
                        <FormattedText>{ability.description}</FormattedText>
                    </td>
                </tr>
            </tbody>
        </table>
    </figure>)
}
