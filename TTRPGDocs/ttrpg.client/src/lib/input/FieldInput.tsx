import { JSX } from "react"
import { BaseInputProps } from "./BaseInputProps"
import { BaseSmartInput } from "./SmartInput"

export interface FieldInputProps<T, TInner extends T[keyof T]> extends BaseInputProps<T> {
    field: keyof T,
    fieldInput?: (props: BaseInputProps<TInner>) => JSX.Element,
}
export function FieldInput<T, TInner extends T[keyof T]>({
    value,
    setter,
    field,
    fieldInput,
    ...props
}: FieldInputProps<T, TInner>) {
    const stringField = String(field)
    props.idPath = [...props.idPath, stringField]

    fieldInput ??= BaseSmartInput<TInner>

    return fieldInput({
        value: value[field] as TInner,
        setter: x => setter({ ...value, [field]: x }),
        ...props,
    })
}