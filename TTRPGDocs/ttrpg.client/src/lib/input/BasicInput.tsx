import { BaseInputProps } from "./BaseInputProps"
import { NativeInputContainer } from "./NativeInputContainer"

export function BasicInput({
    setter,
    ...props
}: BaseInputProps<string>) {
    return NativeInputContainer<string, React.InputHTMLAttributes<HTMLInputElement>>(x => <input {...x} />, {
        onChange: e => setter(e.currentTarget.value),
        ...props,
    })
}