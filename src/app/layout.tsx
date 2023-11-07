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
                    <div className="flex h-full flex-1 flex-col px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full h-full sm:max-w-sm">
                            {children}
                        </div>
                    </div>
                </PasscodeAuthModalProvider>
            </NotificationToastProvider>
        </NDKProvider>
        </body>
        </html>
    )
}
