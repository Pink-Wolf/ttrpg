export default interface Condition {
    name: string;
    summary: string;
    description: string;
}

export function GetConditions(): Condition[] {
    return [
        {
            name: "Knocked Out",
            summary: "Cannot act; caused by taking too much {Damage}.",
            description: "Cannot perform any actions.\n\nCharacters gain this condition when having more {Damage} than {Endurance}, and loses this condition when not."
        },
    ]
}
