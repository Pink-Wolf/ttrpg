export default function betterEncodeURIComponent(str: string): string {
    return encodeURIComponent(str.toLowerCase())
        .replace( // this step is taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent > Encoding for RFC3986
            /[!'()*\:]/g,
            (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
        )
        .replace(/(?:%20)/g, `+`) // encode " " as "+"
}
export function betterDecodeURIComponent(str: string): string {
    return decodeURIComponent(str)
        .replace(/\+/g, ` `)
}

export function encodePageParameter(str: string): string {
    return (process.env.GENERATE_STATIC_PARAMS_AUTO_ENCODES === "1")
        ? str
        : betterEncodeURIComponent(str)
}
export function decodePageParameter(str: string): string {
    return (process.env.GENERATE_STATIC_PARAMS_AUTO_ENCODES === "1")
        ? betterDecodeURIComponent(decodeURIComponent(str))
        : betterDecodeURIComponent(str)
}