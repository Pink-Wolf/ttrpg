import "@/styles/globals.css"
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: "Pink's TTRPG",
    description: "This ttrpg is still in its early stages of development",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
