import "@/styles/ability.css"

export default interface Ability {
    name: string;
    description: string;
    frequency?: string;
    actions?: string;
    reaction?: string;
    target?: string;
    skill?: string;
    bonus?: string;
}
