import { Fragment } from "react"
import { fromCamelCaseToSpaced } from "@/formatter"
import { BaseInputProps, FieldInput, BasicInput, ArrayInput, RecordAsArrayInput } from "@/Input"
import Ability from "./ability"
import Destiny, { DestinyPlaystyle } from "./destiny"
import { AbilityInput } from "./AbilityInput"

export default function DestinyInput({ value, setter, idPath, label, disabled }: BaseInputProps<Destiny>) {

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
