import { fromCamelCaseToSpaced } from "@/formatter";
import { ArrayInput, BaseInputProps, BasicInput, FieldInput, OptionalInput } from "@/Input";
import Tool from "./tool";
import Ability from "./ability";
import { AbilityInput } from "./AbilityInput";

export default function ToolInput({ value, setter, idPath, label, disabled }: BaseInputProps<Tool>) {
    return (<div className="tool-editor">
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
            field="level" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="price" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="rarity" fieldInput={props => OptionalInput({
                ...props,
                onBecomingDefined: () => "",
            })}
        />
        <FieldInput value={value} setter={setter} idPath={idPath} disabled={disabled}
            field="abilities" fieldInput={props => ArrayInput({
                ...props as BaseInputProps<Ability[]>,
                forEach: AbilityInput,
                newValue: () => ({
                    name: "",
                    description: "",
                })
            })}
        />
    </div>)
}