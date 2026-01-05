export default interface SimpleKeyword {
    name: string;
    summary: string;
    path: string;
}

export function GetSimpleKeywords(): SimpleKeyword[] {
    return [
        {
            name: "Attribute",
            summary: "The 4 broad capabilities that {Skill}s can be under. A character has a die associated with each attribute.",
            path: "/article/attributes+and+skills",
        },
        {
            name: "Skill",
            summary: "Characters gain levels in various skills to be better at performing related actions.",
            path: "/article/attributes+and+skills",
        },
        {
            name: "Adventurer",
            summary: "A Player's character.",
            path: "/article/adventurer",
        },
        {
            name: "Conditions",
            summary: "States that can be applied to characters to affect them.",
            path: "/article/conditions",
        },
        {
            name: "Damage",
            summary: "When damage is dealt to a character, that character simply accumulates it. Accumulating too much damage causes {Knocked_Out}.",
            path: "/article/damage",
        },
        {
            name: "Fatigue",
            summary: "Gained over an adventure. {Damage} cannot be removed below a character's Fatigue.",
            path: "/article/damage",
        },
        {
            name: "Endurance",
            summary: "How much {Damage} a character can take before being {Knocked_Out}.",
            path: "/article/damage",
        },
        {
            name: "Short Rest",
            summary: "An hour of doing nothing taxing.",
            path: "/article/rest#short+rest",
        },
        {
            name: "Long Rest",
            summary: "6 or more hours of sleep. Can only be done once per day.",
            path: "/article/rest#long+rest",
        },
        {
            name: "Downtime Rest",
            summary: "A day of doing nothing taxing. Requires a proper bed, warmth and meal, and so cannot be done in the wilderness",
            path: "/article/rest#downtime+rest",
        },
    ]
}
