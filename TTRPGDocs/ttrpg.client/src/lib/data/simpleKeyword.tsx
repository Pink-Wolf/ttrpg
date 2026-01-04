export default interface SimpleKeyword {
    name: string;
    summary: string;
    path: string;
}

export function GetSimpleKeywords(): SimpleKeyword[] {
    return [
        {
            name: "Fatigue",
            summary: "Gained over an adventure. Damage cannot be removed below a character's Fatigue.",
            path: "/article/damage",
        },
        {
            name: "Endurance",
            summary: "How much damage a character can take before being Knocked Out.",
            path: "/article/damage",
        },
    ]
}
