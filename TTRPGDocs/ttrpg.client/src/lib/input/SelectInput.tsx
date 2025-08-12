import { BaseInputProps } from "./BaseInputProps"
import { NativeInputContainer } from "./NativeInputContainer"

export interface SelectOption {
    name: string;
}
export function SelectInput<T extends SelectOption | string, TProps extends BaseInputProps<T>>({
    setter,
    options,
    ...props
}: TProps & { options: T[] }) {
    return NativeInputContainer<T, React.InputHTMLAttributes<HTMLSelectElement>>(x => (<select {...x}>
        {options.map((option, optionIndex) => {
            const optionName = (typeof option === `string`) ? option : option.name
            return <option key={optionIndex} value={optionIndex}>{optionName}</option>
        })}
    </select>), {
        onChange: e => setter(options.at(Number(e.currentTarget.value))!),
        ...props,
        value: (typeof props.value === `string`) ? props.value : props.value.name
    })
}