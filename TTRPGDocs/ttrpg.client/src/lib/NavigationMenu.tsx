import "@/styles/NavigationMenu.css"
import Link from "next/link";
import { JSX } from "react";
import betterEncodeURIComponent from "./betterEncodeURIComponent";

export interface navigationItem {
    name: string;
    pathName?: string;
    children?: (navigationItem | string)[];
    Display?: JSX.ElementType;
}

export default function NavigationMenu({ items, Display, pathPrefix }: { items: (navigationItem | string)[], Display?: JSX.ElementType, pathPrefix?: string }) {
    pathPrefix ??= ""
    return (<ul className="navigation-menu">
        {items.map((item, index) => {
            if (typeof item === "string") item = {
                name: item,
            }
            const CurrentDisplay = item.Display ?? Display ?? (({ children, href }: { children: string, href: string }) => <Link href={href}>{children}</Link>)
            const path = `${pathPrefix}${item.pathName ?? betterEncodeURIComponent(item.name)}/`

            return (<li key={index}>
                <CurrentDisplay href={path}>{item.name}</CurrentDisplay>
                {
                    (item.children === undefined)
                        ? null
                        : <NavigationMenu items={item.children} Display={CurrentDisplay} pathPrefix={path} />
                }
            </li>)
        })}
    </ul>)
}
