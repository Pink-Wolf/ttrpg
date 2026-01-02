import "@/styles/globals.css"
import type { Metadata } from "next";
import { MedievalSharp, Atkinson_Hyperlegible } from 'next/font/google'
import { getAllDestinies } from "@/data/destiny";
import NavigationMenu from "@/NavigationMenu";
import getArticleNames from "./article/getArticleNames";
import { getAllOrigins } from "@/data/origin";
import { getAllTools } from "@/data/tool";

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: "Pink's TTRPG",
    description: "This ttrpg is still in its early stages of development",
};

const headerFont = MedievalSharp({
    weight: '400',
    subsets: ['latin'],
    variable: '--headerFont'
})
const bodyFont = Atkinson_Hyperlegible({
    weight: '400',
    subsets: ['latin'],
    variable: '--bodyFont'
})

async function HeaderMenu() {
    const articles = getArticleNames()
    const destinies = getAllDestinies()
    const origins = getAllOrigins()
    const tools = getAllTools()

    const editorChild = process.env.INCLUDE_EDITOR !== `1`
        ? []
        : [{
            name: `Edit`,
            pathName: `editor`,
        }]

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
                        children: editorChild
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
                        children: editorChild
                    }
                }),
            },
            {
                name: "Tools",
                pathName: "/tool",
                children: Object.entries(await tools).map(([path, item]) => {
                    return {
                        name: item.name,
                        pathName: path,
                        children: editorChild
                    }
                }),
            },
        ]
    } />)
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${headerFont.variable} ${bodyFont.variable}`}>
            <body>
                <HeaderMenu />
                {children}
            </body>
        </html>
    );
}
