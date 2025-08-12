import { JSX } from "react"
import { fromCamelCaseToSpaced } from "../formatter"
import { BaseInputProps } from "./BaseInputProps"
import { BaseSmartInput } from "./SmartInput"
import { FieldInput } from "./FieldInput"

export interface ObjectInputProps<T> extends BaseInputProps<Record<keyof T, T[keyof T]>> {
    fieldInput?: (props: BaseInputProps<T[keyof T]>) => JSX.Element,
}
export function ObjectInput<T>({
    value,
    setter,
    idPath,
    label,
    disabled,
    fieldInput,
}: ObjectInputProps<T>) {
    label ??= fromCamelCaseToSpaced(idPath[idPath.length - 1])

    fieldInput ??= BaseSmartInput<T[keyof T]>

    return (<div>
        {label}
        <ul>
            {Object.entries(value).map(([field,], index) => {
                return (<li key={index}>
                    {fromCamelCaseToSpaced(field)}
                    <FieldInput value={value} setter={setter}
                        idPath={idPath} disabled={disabled}
                        field={field as keyof T}
                        label=""
                    />
                </li>)
            })}
        </ul>
    </div>)
}