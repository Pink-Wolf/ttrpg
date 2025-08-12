import { fromCamelCaseToSpaced } from "@/formatter";
import { BaseInputProps, FieldInput, BasicInput, OptionalInput } from "@/Input";
import Ability from "./ability";

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
