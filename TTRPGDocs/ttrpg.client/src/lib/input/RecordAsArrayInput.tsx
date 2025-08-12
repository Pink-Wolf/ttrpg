import { ArrayInput, BaseInputProps, BaseSmartInput, BasicInput } from "@/Input"
import { JSX, Fragment } from "react"
import { fromCamelCaseToSpaced } from "@/formatter"

export interface RecordAsArrayInputProps<T> extends BaseInputProps<Record<string, T>> {
    forEach?: (props: BaseInputProps<T>) => JSX.Element
    newValue?: () => [string, T],
    onlyRemoveLast?: boolean,
    fieldInput?: (props: BaseInputProps<string>) => JSX.Element
}
export function RecordAsArrayInput<T>({
    value,
    setter,
    forEach,
    fieldInput,
    ...props
}: RecordAsArrayInputProps<T>) {

    fieldInput ??= x => <Fragment>{fromCamelCaseToSpaced(x.value)}</Fragment>
    forEach ??= BaseSmartInput<T>

    return (ArrayInput({
        ...props,
        value: Object.entries(value),
        setter: x => setter(Object.fromEntries(x)),
        forEach: ({ value, setter, idPath, ...props }) => (<Fragment>
            {fieldInput({
                value: value[0],
                setter: x => setter([x, value[1]]),
                idPath: [...idPath, "field"],
                ...props
            }) }
            {forEach({
                value: value[1],
                setter: x => setter([value[0], x]),
                idPath: [...idPath, "value"],
                ...props,
            }) }
        </Fragment>),
    }))
}