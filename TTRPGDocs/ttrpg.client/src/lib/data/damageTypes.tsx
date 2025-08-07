export default interface DamageType {
    name: string;
    description: string;
}

export function GetDamageTypes(): DamageType[] {
    return [
        {
            name: "Bludgeoning",
            description: "damage from blunt force trauma.",
        },
        {
            name: "Piercing",
            description: "damage from being stapped.",
        },
        {
            name: "Slashing",
            description: "damage from being cut.",
        },
        {
            name: "Arcane Energy",
            description: "damage from pure arcane magic.",
        },
        {
            name: "Cold",
            description: "damage from the lack of heat.",
        },
        {
            name: "Fire",
            description: "damage from heat.",
        },
        {
            name: "Poison",
            description: "damage from poisons, as well as diseases and viruses.",
        },
        {
            name: "Chemical",
            description: "damage from strong acids and bases.",
        },
        {
            name: "Lightning",
            description: "damage from electricity.",
        },
        {
            name: "Thunder",
            description: "damage from vibrations like sound.",
        },
        {
            name: "Psychic",
            description: "damage from attacks against one&apos;s mind.",
        },
    ]
}
