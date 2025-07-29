export default function betterEncodeURIComponent(str: string): string {
    // code taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent > Encoding for RFC3986
    return encodeURIComponent(str.toLowerCase())
        .replace(
            /[!'()*\:]/g,
            (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
        )
}

export function encodePageParameter(str: string): string {
    return (process.env.GENERATE_STATIC_PARAMS_AUTO_ENCODES === "1")
        ? str
        : betterEncodeURIComponent(str)
}
export function decodePageParameter(str: string): string {
    return (process.env.GENERATE_STATIC_PARAMS_AUTO_ENCODES === "1")
        ? decodeURIComponent(decodeURIComponent(str))
        : decodeURIComponent(str)
}