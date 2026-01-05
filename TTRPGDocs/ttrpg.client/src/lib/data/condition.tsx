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
        {
            name: "Physical Wound",
            summary: "Various negative conditions that requires rest to heal.",
            description: "Different physical wounds provide different negative effects.\n\nPhysical Wounds are healed by a week of rest in a proper bed.\nIf it is unrealistic for mere rest to heal a particular wound, then proper treatment must first be acquired before the rest."
        },
    ]
}
