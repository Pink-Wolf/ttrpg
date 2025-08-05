export function toTitleCase(str: string): string {
    return upperCaseFirstLetter(str.replace(/\s\w/g, x => x.charAt(0) + x.charAt(1).toUpperCase()))
}
export function upperCaseFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
