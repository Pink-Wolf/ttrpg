import "@/styles/destiny.css"
import betterEncodeURIComponent from "@/betterEncodeURIComponent";
import { getData } from "./getData";
import Ability, { AbilityViewer } from "./ability";
import FormattedText from "@/formatter";

export default interface Destiny {
    name: string;
    summary: string;
    description: string;
    playstyles: DestinyPlaystyle[];
    abilities: Map<string, Ability[]>;
}
export interface DestinyPlaystyle {
    title: string;
    description: string;
}

export async function DestinyViewer({ data }: { data: Destiny }) {
    const destiny = data

    return (<article className="destiny-viewer">
        <h1>{destiny.name}</h1>
        <FormattedText>{destiny.description}</FormattedText>
        <figure className="destiny-playstyle-viewer">
            {destiny.playstyles.map(playstyle => {
                return (<div key={playstyle.title}>
                    <b>{playstyle.title}</b>, <FormattedText>{playstyle.description}</FormattedText>
                </div>)
            })}
        </figure>

        <h2>Abilities</h2>
        <section className="destiny-ability-viewer">
            {Object.entries(destiny.abilities).map((x) => {
                const level = x[0]
                const abilities = x[1] as Ability[]

                return (<section key={level}>
                    <h3>Level {level}:</h3>
                    {abilities.map(ability => {
                        return <AbilityViewer data={ability} key={ability.name} />
                    })}
                </section>)
            })}
        </section>
    </article>)
}

export function getAllDestinies(): Promise<Record<string, Destiny>> {
    return getData<Record<string, Destiny>>("destiny/")
}
export async function getDestiny(name: string): Promise<Destiny> {
    const encodedName = betterEncodeURIComponent(name)
    if (process.env.CACHE_SERVER_DATA == `1`) { // just get all at once, if they are cached anyways
        const dataContainer = await getAllDestinies()
        const data = dataContainer[encodedName]
        if (data === undefined) throw new Error(
            `Could not find destiny with name ${encodedName}`
        )
        return data
    }
    else return await getData("destiny/" + encodedName)
}
