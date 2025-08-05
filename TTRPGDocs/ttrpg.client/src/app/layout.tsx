import "@/styles/globals.css"
import type { Metadata } from "next";
import { getAllDestinies } from "@/data/destiny";
import NavigationMenu from "@/NavigationMenu";
import getArticleNames from "./article/getArticleNames";
import { getAllOrigins } from "@/data/origin";

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: "Pink's TTRPG",
    description: "This ttrpg is still in its early stages of development",
};

async function HeaderMenu() {
    const articles = getArticleNames()
    const destinies = getAllDestinies()
    const origins = getAllOrigins()

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
                children: Object.entries(await destinies).map(([path, item]) => {
                    return {
                        name: item.name,
                        pathName: path,
                    }
                }),
            },
            {
                name: "Origins",
                pathName: "/origin",
                children: Object.entries(await origins).map(([path, item]) => {
                    return {
                        name: item.name,
                        pathName: path,
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
