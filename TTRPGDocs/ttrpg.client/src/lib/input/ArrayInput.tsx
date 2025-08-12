import { JSX } from "react";
import { fromCamelCaseToSpaced } from "@/formatter";
import { BaseInputProps } from "./BaseInputProps";
import { BaseSmartInput } from "./SmartInput";

export interface ArrayInputProps<T> extends BaseInputProps<T[]> {
    forEach?: (props: BaseInputProps<T>) => JSX.Element
    newValue?: () => T,
    onlyRemoveLast?: boolean
}
export function ArrayInput<T>({
    value,
    setter,
    idPath,
    label,
    disabled,
    forEach,
    newValue,
    onlyRemoveLast,
}: ArrayInputProps<T>) {
    const idString = idPath.join(`.`)
    label ??= fromCamelCaseToSpaced(idPath[idPath.length - 1])

    forEach ??= BaseSmartInput<T>
    onlyRemoveLast ??= false
    const staticArraySize = newValue === undefined

    return (<div>
        {label}
        <ul>
            {value.map((element, index) => {
                return (<li key={index}>
                    {(staticArraySize || onlyRemoveLast) ? `` : (<input
                        type="button" value="-" disabled={disabled} id={`${idString}.remove(${index})`}
                        onClick={() => setter(value.toSpliced(index, 1))}
                    />)}
                    {forEach({
                        value: element,
                        setter: x => setter(value.with(index, x)),
                        idPath: [...idPath, String(index)],
                        label: ``,
                        disabled: disabled,
                    })}
                </li>)
            })}
            {staticArraySize ? `` : (<li>
                <input
                    type="button" value="-" disabled={disabled} id={`${idString}.remove(last)`}
                    onClick={() => setter(value.slice(0, value.length - 1))}
                />
                <input
                    type="button" value="+" disabled={disabled} id={`${idString}.add(last)`}
                    onClick={() => setter(value.concat([newValue()]))}
                />
            </li>)}
        </ul>
    </div>)
}