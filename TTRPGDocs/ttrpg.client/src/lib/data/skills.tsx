
const skillCategories = {
    Social: ["Awe", "Trickery", "Reason", "Charm"],
    Defense: ["Fortitude", "Dodge", "Warding", "Will"],
    Movement: ["Athletics", "Stealth", "Navigate", "Travel"],
    Knowledge: ["Body", "Nature", "Lore", "People"],
    Perception: ["Awareness", "Find", "Study", "Insight"],
    Creation: ["Crafting", "Brewing", "Arcane", "Storytelling"],
}
export function getSkillCategories(): Record<string, string[]> {
    return skillCategories
}

const skills = Object.values(skillCategories).flat()
export default function getSkillNames(): string[] {
    return skills
}
