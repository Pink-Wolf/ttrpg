import { BaseInputProps } from "./BaseInputProps"
import { NativeInputContainer } from "./NativeInputContainer"

export function CheckboxInput<TProps extends BaseInputProps<boolean>>({
    setter,
    value,
    ...props
}: TProps) {
    return NativeInputContainer<string, React.InputHTMLAttributes<HTMLInputElement>>(x => <input {...x} type="checkbox" />, {
        onChange: e => setter(e.currentTarget.checked),
        checked: value,
        ...props,
    })
}