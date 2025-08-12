import { Fragment, JSX } from "react"
import { fromCamelCaseToSpaced } from "@/formatter"

export function NativeInputContainer<T, InputProps extends {
    id?: string,
    disabled?: boolean,
}>(
    baseInput: (props: InputProps) => JSX.Element,
    { idPath, label, ...props }: InputProps & { idPath: string[], label?: string },
) {
    const idString = idPath.join(`.`)
    props.id ??= idString
    label ??= fromCamelCaseToSpaced(idPath[idPath.length - 1])
    props.disabled ??= false

    return (<Fragment>
        <label htmlFor={idString}>{label}</label>
        {baseInput(props as unknown as InputProps)}
    </Fragment>)
}