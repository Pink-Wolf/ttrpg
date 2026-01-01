import { fromCamelCaseToSpaced } from "@/formatter";
import { BaseInputProps, FieldInput, BasicInput, OptionalInput, RecordAsArrayInput, ArrayInput, SmartInput } from "@/Input";
import Ability from "./ability";
import Origin from "./origin";
import { AbilityInput } from "./AbilityInput";
import { GetAttributes } from "./attributes";

export default function OriginInput({ value, setter, idPath, label, disabled }: BaseInputProps<Origin>) {
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
                definedInput: propsObj => {
                    const props = propsObj as BaseInputProps<Record<string, string>>;
                    props.value = Object.fromEntries(GetAttributes().map((attribute) => [attribute.name, props.value[attribute.name] ?? ""]))
                    return SmartInput({ ...props });
                }
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
