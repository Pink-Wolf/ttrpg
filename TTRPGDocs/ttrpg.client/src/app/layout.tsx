import "@/styles/globals.css"
import type { Metadata } from "next";
import { getAllDestinies } from "@/data/destiny";
import NavigationMenu from "@/NavigationMenu";
import getArticleNames from "./article/getArticleNames";

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: "Pink's TTRPG",
    description: "This ttrpg is still in its early stages of development",
};

async function HeaderMenu() {
    const articles = getArticleNames()
    const destinies = await getAllDestinies()

    return (<NavigationMenu items={
        [
            {
                name: "Home",
                pathName: "/",
            },
            {
                name: "Articles",
                pathName: "/article",
                children: articles,
            },
            {
                name: "Destinies",
                pathName: "/destiny",
                children: Object.entries(destinies).map(([destinyPath, destiny]) => {
                    return {
                        name: destiny.name,
                        pathName: destinyPath,
                    }
                }),
            },
        ]
    } />)
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <HeaderMenu />
                {children}
            </body>
        </html>
    );
}
