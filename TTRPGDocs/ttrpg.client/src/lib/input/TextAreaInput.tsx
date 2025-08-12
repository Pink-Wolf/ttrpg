import { BaseInputProps } from "./BaseInputProps"
import { NativeInputContainer } from "./NativeInputContainer"

export function TextAreaInput({
    setter,
    ...props
}: BaseInputProps<string>) {

    function UpdateHeight(target: HTMLTextAreaElement) {
        target.style.height = "0px"
        target.style.height = target.scrollHeight + "px"
    }

    return NativeInputContainer<string, React.InputHTMLAttributes<HTMLTextAreaElement>>(x => <textarea {...x} style={{ height: `1.45em` }} />, {
        onChange: e => {
            setter(e.currentTarget.value)
            UpdateHeight(e.currentTarget)
        },
        onFocus: e => UpdateHeight(e.currentTarget),
        ...props,
    })
}