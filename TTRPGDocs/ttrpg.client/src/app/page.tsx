import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
    return (
        <Fragment>
            <h1> !!! This ttrpg is still in its early stages of development !!! </h1>
            <ul>
                <li><Link href="/article">Articles</Link></li>
                <li><Link href="/destiny">Destinies</Link></li>
            </ul>
        </Fragment>
    );
}
