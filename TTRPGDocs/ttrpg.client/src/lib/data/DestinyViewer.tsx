import FormattedText from "@/formatter"
import Ability from "./ability"
import Destiny from "./destiny"
import { AbilityViewer } from "./AbilityViewer"

export default async function DestinyViewer({ data }: { data: Destiny }) {
    const destiny = data

    return (<article className="destiny-viewer">
        <h1>{destiny.name}</h1>
        <FormattedText>{destiny.description}</FormattedText>
        <figure className="destiny-playstyle-viewer">
            {destiny.playstyles.map(playstyle => {
                return (<div key={playstyle.title}>
                    <FormattedText>**{playstyle.title}** {playstyle.description}</FormattedText>
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
