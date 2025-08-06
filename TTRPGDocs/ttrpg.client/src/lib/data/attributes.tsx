const attributeSummary = {
    Physique: "The physical strength and constitution of a character's body.",
    Wits: "The quick-thinking and dexterity of a character.",
    Intellect: "The scholarly knowledge and reasoning of a character.",
    Heart: "The charms, religious knowledge, and empathy of a character.",
}
export function getAttributeSummaries(): Record<string, string> {
    return attributeSummary
}

const attributes = Object.keys(getAttributeSummaries())
export function getAttributes(): string[] {
    return attributes
}
