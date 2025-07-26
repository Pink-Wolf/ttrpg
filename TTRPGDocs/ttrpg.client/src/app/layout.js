import "@/styles/globals.css"

export const dynamic = 'force-static'

export const metadata = {
    title: "Pink's TTRPG",
    description: "This ttrpg is still in its early stages of development",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
