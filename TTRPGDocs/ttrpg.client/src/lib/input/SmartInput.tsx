import { JSX } from "react"
import { ArrayInput } from "./ArrayInput"
import { BaseInputProps } from "./BaseInputProps"
import { BasicInput } from "./BasicInput"
import { CheckboxInput } from "./CheckboxInput"
import { ObjectInput } from "./ObjectInput"
import { TextAreaInput } from "./TextAreaInput"

export function BaseSmartInput<T>(props: BaseInputProps<T>) {
    return SmartInput<T>({ ...props })
}

export function SmartInput<T>(props: BaseInputProps<T> & { [key: string]: unknown }) {
    const value = props.value

    const InputComponent = (Array.isArray(value) ? ArrayInput
        : (typeof value === `string`) ? TextAreaInput
            : (typeof value === `boolean`) ? CheckboxInput
                : (typeof value === `object`) ? ObjectInput
                    : BasicInput
    ) as (props: unknown) => JSX.Element

    return InputComponent(props)
}