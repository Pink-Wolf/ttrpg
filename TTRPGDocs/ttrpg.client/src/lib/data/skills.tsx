import Attribute, { GetAttributes } from "./attributes";

export default interface Skill {
    name: string;
    description: string;
    summary: string;
}
export interface SkillCategory {
    name: string;
    description: string;
    skills: Record<string, Skill>;
}

export function GetSkillCategories(): SkillCategory[] {
    return skillCategories
}
const skillCategories = [
    {
        name: "Social",
        description: "Skills used to control peoples' choices without any magic.",
        skills: {
            Physique: {
                name: "Awe",
                description: "The apparent strength of the character. This awe can inspire respect, hope in allies, and fear in opponents.",
                summary: "{Physique} Social skill",
            },
            Wits: {
                name: "Trickery",
                description: "The art of deception and manipulation, sharing only what is convenient for the other party to hear.",
                summary: "{Wits} Social skill",
            },
            Intellect: {
                name: "Reason",
                description: "The ability to use logic to explain why you are always right.",
                summary: "{Intellect} Social skill",
            },
            Heart: {
                name: "Charm",
                description: "Whether through words or just one's general likability,\nthe ability to control people's emotions or make them help you out of the goodness of their heart.",
                summary: "{Heart} Social skill",
            },
        },
    },
    {
        name: "Defense",
        description: "Skills used to avoid negative effects.",
        skills: {
            Physique: {
                name: "Fortitude",
                description: "The ability of the body to resist attacks, such as poisons, viruses, and alchohol.",
                summary: "{Physique} Defense skill",
            },
            Wits: {
                name: "Dodge",
                description: "The ability to react and move out of the way of danger.",
                summary: "{Wits} Defense skill",
            },
            Intellect: {
                name: "Warding",
                description: "Perhaps more niche than other forms of protection, this skill resists pure magic and allows magical protection.",
                summary: "{Intellect} Defense skill",
            },
            Heart: {
                name: "Will",
                description: "The strength of the mind to avoid magical and natural influences.",
                summary: "{Heart} Defense skill",
            },
        },
    },
    {
        name: "Movement",
        description: "Skills used for physical activities and travelling large distances.",
        skills: {
            Physique: {
                name: "Athletics",
                description: "The ability to use weapons and perform deeds requiring physical strength or a high stamina.",
                summary: "{Physique} Movement skill",
            },
            Wits: {
                name: "Stealth",
                description: "To remain hidden, or perform unseen actions, stealth keeps your presence and acts unknown to others.",
                summary: "{Wits} Movement skill",
            },
            Intellect: {
                name: "Navigate",
                description: "Whether by use of the stars or a map, the ability to locate your current position and orientation.",
                summary: "{Intellect} Movement skill",
            },
            Heart: {
                name: "Travel",
                description: "Travelling for days with little going on is surprisingly hard.\nTo keep track of rations, to keep spirits high, to make sure noone falls behind, there is a lot to do which this skill helps with.",
                summary: "{Heart} Movement skill",
            },
        },
    },
    {
        name: "Knowledge",
        description: "Fields of science to be learned in, or simply have practical experiences with.",
        skills: {
            Physique: {
                name: "Body",
                description: "Understanding of the body is primarily used when healing physical injuries.",
                summary: "{Physique} Knowledge skill",
            },
            Wits: {
                name: "Nature",
                description: "Knowledge of plants and animals, of what plants to combine to heal a burn, or where best to scratch a cat, you will hardly find someone who could not use more knowledge of nature.",
                summary: "{Wits} Knowledge skill",
            },
            Intellect: {
                name: "Lore",
                description: "While some may be skilled in specific fields, this skill covers a general and random collection of knowledge spanning history and the fundamental nature of the world.",
                summary: "{Intellect} Knowledge skill",
            },
            Heart: {
                name: "People",
                description: "Whether it be the local customs, people's likely reaction, or the gods and their influence over communities, people are a complex field of study.",
                summary: "{Heart} Knowledge skill",
            },
        },
    },
    {
        name: "Perception",
        description: "The abilities to gather information about a situation.",
        skills: {
            Physique: {
                name: "Awareness",
                description: "A constant sense of what is going on, especially from the corner of one's eye. This awareness helps avoid surprises like an ambush or trap.",
                summary: "{Physique} Perception skill",
            },
            Wits: {
                name: "Find",
                description: "Whether it be searching a room or following a trail, the ability to find both things of importance and things of profit is a prime skill for treasure hunters.",
                summary: "{Wits} Perception skill",
            },
            Intellect: {
                name: "Study",
                description: "Whether it be studying books for their knowledge, or experimenting on an object to learn of its function, this skill is invaluable for the scholarly folk.",
                summary: "{Intellect} Perception skill",
            },
            Heart: {
                name: "Insight",
                description: "Understanding the words unspoken, or the intentions hidden away, insight is the opponent of other's trickery, whether intentional or not.",
                summary: "{Heart} Perception skill",
            },
        },
    },
    {
        name: "Art",
        description: "Various skills used for creation.",
        skills: {
            Physique: {
                name: "Crafting",
                description: "By hand or tool, crafting sculptures of stone or weapons of metal, this skill covers the arts requiring a strong hand, especially ones where function matters more than appearance.",
                summary: "{Physique} Art skill",
            },
            Wits: {
                name: "Brewing",
                description: "Whether cooking a healthy dinner, or combining some berries to make a deadly toxin, brewing is a natural skill often decried as witchcraft.",
                summary: "{Wits} Art skill",
            },
            Intellect: {
                name: "Arcane",
                description: "The ability to cast spells and enchant tools, as well as understanding these spells and enchantments.",
                summary: "{Intellect} Art skill",
            },
            Heart: {
                name: "Storytelling",
                description: "To craft stories, songs, myths and poems; to control people's emotion with nothing but words; it is hard to believe it is not arcane magic.",
                summary: "{Heart} Art skill",
            },
        },
    },
]

const attributeSkills = Object.fromEntries(GetAttributes()
    .map(attribute => {
        return [attribute.name, GetSkillCategories()
            .map(category => {
                return category.skills[attribute.name]
            })
        ]
    })
)
export function GetSkillsFromAttribute(attribute: Attribute | string): Skill[] {
    if (typeof attribute !== `string`)
        attribute = attribute.name

    return attributeSkills[attribute]
}

const skills = GetSkillCategories()
    .map(category => {
        return Object.values(category.skills)
    })
    .flat()
export function GetSkills(): Skill[] {
    return skills
}
