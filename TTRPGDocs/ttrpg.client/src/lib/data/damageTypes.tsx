export default interface DamageType {
    name: string;
    description: string;
}

export function GetDamageTypes(): DamageType[] {
    return [
        {
            name: "Bludgeoning",
            description: "Damage from blunt force trauma.",
        },
        {
            name: "Piercing",
            description: "Damage from being stapped.",
        },
        {
            name: "Slashing",
            description: "Damage from being cut.",
        },
        {
            name: "Arcane Energy",
            description: "Damage from pure arcane magic.",
        },
        {
            name: "Cold",
            description: "Damage from the lack of heat.",
        },
        {
            name: "Fire",
            description: "Damage from heat.",
        },
        {
            name: "Poison",
            description: "Damage from poisons, as well as diseases and viruses.",
        },
        {
            name: "Chemical",
            description: "Damage from strong acids and bases.",
        },
        {
            name: "Lightning",
            description: "Damage from electricity.",
        },
        {
            name: "Thunder",
            description: "Damage from vibrations like sound.",
        },
        {
            name: "Psychic",
            description: "Damage from attacks against one&apos;s mind.",
        },
    ]
}
