import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import NotificationToastProvider from "@/components/NotificationToastProvider";
import PasscodeAuthModalProvider from "@/components/PasscodeAuthModalProvider";
import NDKProvider from "@/components/NDKProvider";

const inter = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: 'swap',
    subsets: ['latin-ext']
})

export const metadata: Metadata = {
    title: 'Plutus',
    description: 'Peer-to-Peer Personal Debt Tracking tailored for friends and family.',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={'h-full bg-white'}>
        <body className={`${inter.className} h-full`}>
        <NDKProvider>
            <NotificationToastProvider>
                <PasscodeAuthModalProvider>
                    {children}
                </PasscodeAuthModalProvider>
            </NotificationToastProvider>
        </NDKProvider>
        </body>
        </html>
    )
}
