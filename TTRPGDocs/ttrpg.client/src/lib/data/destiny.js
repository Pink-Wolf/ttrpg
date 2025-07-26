export async function DestinyViewer({ data }) {
    const destiny = data

    return (<article>
        <h1>{destiny.name}</h1>
        <p>{destiny.description}</p>
    </article>)
}