export default interface DamageType {
    name: string;
    description: string;
}

export default function GetDamageTypes(): Record<string, DamageType> {
    return {
        bludgeoning: {
            name: "Bludgeoning",
            description: "damage from blunt force trauma.",
        },
        piercing: {
            name: "Piercing",
            description: "damage from being stapped.",
        },
        slashing: {
            name: "Slashing",
            description: "damage from being cut.",
        },
        arcaneEnergy: {
            name: "Arcane Energy",
            description: "damage from pure arcane magic.",
        },
        cold: {
            name: "Cold",
            description: "damage from the lack of heat.",
        },
        fire: {
            name: "Fire",
            description: "damage from heat.",
        },
        poison: {
            name: "Poison",
            description: "damage from poisons, as well as diseases and viruses.",
        },
        chemical: {
            name: "Chemical",
            description: "damage from strong acids and bases.",
        },
        lightning: {
            name: "Lightning",
            description: "damage from electricity.",
        },
        thunder: {
            name: "Thunder",
            description: "damage from vibrations like sound.",
        },
        psychic: {
            name: "Psychic",
            description: "damage from attacks against one&apos;s mind.",
        },
    }
}
