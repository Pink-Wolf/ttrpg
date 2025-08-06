import { getAttributes } from "./attributes"

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

const skillSummary = createSkillSummary()
function createSkillSummary() {
    const result: Record<string, string> = {}

    const attributes = getAttributes()
    Object.entries(skillCategories).forEach(([category, skills]) => {
        skills.forEach((skill, index) => {
            result[skill] = `${attributes[index]} ${category} skill`
        })
    })

    return result
}
export function getSkillSummaries(): Record<string, string> {
    return skillSummary
}

const skills = Object.values(skillCategories).flat()
export default function getSkillNames(): string[] {
    return skills
}
