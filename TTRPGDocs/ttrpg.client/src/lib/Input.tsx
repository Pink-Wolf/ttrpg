import { JSX } from "react";
import { fromCamelCaseToSpaced } from "./formatter";

function BasicInput<T extends string | number>({ type, value, setter, disabled, ...props }: { type: string, value: T, setter: (newValue: T) => void, disabled: boolean }) {
    return (<input {...props} type={type} value={value} disabled={disabled}
        onChange={e => {
            const newValue = (typeof value === `string`)
                ? e.currentTarget.value
                : e.currentTarget.valueAsNumber
            setter(newValue as T)
        }}
    />)
}

function TextAreaInput({ value, setter, disabled, ...props }: { value: string, setter: (newValue: string) => void, disabled: boolean }) {
    function UpdateHeight(target: HTMLTextAreaElement) {
        target.style.height = "0px"
        target.style.height = target.scrollHeight + "px"
    }

    return (<textarea {...props} value={value} disabled={disabled} style={{ height: `1.45em` }}
        onFocus={e => UpdateHeight(e.currentTarget)}
        onChange={e => { setter(e.target.value); UpdateHeight(e.currentTarget) } }
    />)
}

interface SelectOption {
    name: string;
}
function SelectInput<T extends SelectOption | string>({ value, setter, disabled, options, ...props }: { value: string, setter: (newValue: T) => void, options: T[], disabled: boolean }) {
    return (<select {...props} value={value} disabled={disabled}
        onChange={e => setter(options.at(Number(e.currentTarget.value)) as T)}
    >
        {options.map((option, optionIndex) => {
            const optionName = (typeof option === `string`) ? option : option.name
            return <option key={optionIndex} value={optionIndex}>{optionName}</option>
        })}
    </select>)
}

function CheckboxInput({ value, setter, disabled, ...props }: { value: boolean, setter: (newValue: boolean) => void, disabled: boolean }) {
    return (<input {...props} type="checkbox" checked={value} disabled={disabled}
        onChange={(e) => setter(Boolean(e.currentTarget.value))}
    />)
}

function ArrayInput<T>({ value, setter, disabled, forEach, newValue = () => ({} as T), ...props }: {
    value: T[],
    setter: (newValue: T[]) => void,
    disabled: boolean,
    forEach: (props: { value: T, setter: (newValue: T) => void, disabled: boolean }) => JSX.Element,
    newValue: () => T
}) {
    return (<ul {...props}>
        {value.map((element, index) => {
            return (<li key={index}>
                <input type="button" value="-" disabled={disabled}
                    onClick={() => setter(value.toSpliced(index, 1))}
                />
                {forEach({
                    value: element,
                    disabled: disabled,
                    setter: newValue => setter(value.with(index, newValue)),
                })}
            </li>)
        })}
        <li>
            <input type="button" value="+" disabled={disabled}
                onClick={() => setter(value.concat(newValue()))}
            />
        </li>
    </ul>)
}

function RecordInput<Key extends string | number | symbol, Elements>({ value, setter, disabled, ...props }: {
    value: Record<Key, Elements>,
    setter: (newValue: Record<Key, Elements>) => void,
    disabled: boolean
}) {
    return (<ul {...props}>
        {Object.entries(value).map(x => {
            const field = x[0] as string
            return (<li key={field}><Input
                value={value[field as Key]}
                setter={(x: Elements) => setter({ ...value, [field]: x })}
                label={field}
                disabled={disabled}
            /></li>)
        })}
    </ul>)
}

export default function Input<T>({ type, value, setter, label, field, disabled, ...props }: {
    type?: string,
    value: T,
    setter: (newValue: T) => void,
    label?: string,
    field?: keyof T,
    disabled?: boolean
}) {
    const actualValue = typeof field !== `undefined`
        ? value[field]
        : value

    if (type === undefined) {
        if (typeof actualValue === `string`) type = `textarea`
        else if (typeof actualValue === `boolean`) type = `boolCheckbox`
        else if (Array.isArray(actualValue)) {
            type = `array`
            props = { forEach: Input<undefined>, ...props }
        }
        else if (typeof actualValue === `object`) type = `record`
    }

    const [InputComponent, multipleInputs]
        = (type === `textarea` ? [TextAreaInput, false]
            : type === `select` ? [SelectInput, false]
                : type === `boolCheckbox` ? [CheckboxInput, false]
                    : type === `array` ? [ArrayInput, true]
                        : type === `record` ? [RecordInput, true]
                            : [BasicInput, false] // type === `simple`
        ) as [(props: unknown) => JSX.Element, boolean]

    label = label
        ?? (typeof field === `string` ? fromCamelCaseToSpaced(field)
            : typeof field === `number` ? String(field)
                : ``)

    disabled ??= false


    const internalProps = {
        ...props,
        setter: typeof field !== `undefined`
            ? (x: T) => setter({ ...value, [field]: x })
            : setter,
        value: actualValue,
        disabled: disabled,
    }

    if (multipleInputs) return (<section className="labelSection">{label}
        {InputComponent(internalProps)}
    </section>)

    return (<label>{label}
        {InputComponent(internalProps)}
    </label>)
}

export function SubmitInput({ label }: { label: string }) {
    return <input type="submit" value={label} />
}
