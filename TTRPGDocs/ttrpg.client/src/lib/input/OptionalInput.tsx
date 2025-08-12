import { JSX } from "react"
import { BaseInputProps } from "./BaseInputProps"
import { BaseSmartInput } from "./SmartInput"
import { CheckboxInput } from "./CheckboxInput"
import { fromCamelCaseToSpaced } from "@/formatter"

export interface OptionalInputProps<T> extends BaseInputProps<T | undefined> {
    onBecomingDefined?: (() => T),
    definedInput?: (props: BaseInputProps<T>) => JSX.Element,
}
export function OptionalInput<T>({
    value,
    setter,
    label,
    idPath,
    disabled,
    onBecomingDefined,
    definedInput,
}: OptionalInputProps<T>) {
    onBecomingDefined ??= () => ({} as T)

    definedInput ??= BaseSmartInput<T>

    return (<div>
        <CheckboxInput value={value !== undefined} setter={x => setter(x ? onBecomingDefined() : undefined)}
            idPath={[...idPath, "nullability"]}
            label={label ?? fromCamelCaseToSpaced(idPath[idPath.length - 1])}
            disabled={disabled}
        />
        {value === undefined ? `` : definedInput({
            value: value,
            setter: setter as (x: T) => void,
            label: ``,
            idPath: [...idPath, "value"],
            disabled: disabled,
        }) }
    </div>)
}