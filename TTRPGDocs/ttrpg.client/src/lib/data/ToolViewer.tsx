import "@/styles/tools.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import FormattedText, { toTitleCase } from "@/formatter";
import Tool from "./tool";
import { AbilityViewer } from "./AbilityViewer";

export default async function ToolViewer({ data }: { data: Tool }) {
    const tool = data

    const fields = Object.keys(tool).filter(field => {
        return !(["name", "summary", "description", "abilities"].includes(field))
    })

    return (<article className="tool-viewer" id={betterEncodeURIComponent(tool.name)}>
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>{tool.name}</th>
                </tr>
            </thead>
            <tbody>
                {fields.map(field => {
                    return (<tr key={field}>
                        <th>{toTitleCase(field)}</th>
                        <td><FormattedText>
                            {tool[field as keyof Tool] as string}
                        </FormattedText></td>
                    </tr>)
                })}
                <tr key="description">
                    <td colSpan={2}>
                        <FormattedText>{tool.description}</FormattedText>

                        {tool.abilities.map((ability, index) => {
                            return <AbilityViewer data={ability} key={index} />
                        })}
                    </td>
                </tr>
            </tbody>
        </table>
    </article>)
}