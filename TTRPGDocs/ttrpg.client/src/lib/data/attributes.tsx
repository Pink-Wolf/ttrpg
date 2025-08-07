export default interface Attribute {
    name: string;
    description: string;
}

export function GetAttributes(): Attribute[] {
    return [
        {
            name: "Physique",
            description: "The physical strength and constitution of a character's body.",
        },
        {
            name: "Wits",
            description: "The quick-thinking and dexterity of a character.",
        },
        {
            name: "Intellect",
            description: "The scholarly knowledge and reasoning of a character.",
        },
        {
            name: "Heart",
            description: "The charms, religious knowledge, and empathy of a character.",
        },
    ]
}
