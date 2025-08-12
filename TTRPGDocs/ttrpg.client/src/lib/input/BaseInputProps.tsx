export interface BaseInputProps<T> {
    value: T,
    setter: (x: T) => void,
    idPath: string[],
    label?: string,
    disabled?: boolean,
}