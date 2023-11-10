"use client"

import {createContext, ReactNode, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface SessionContext {
}

export const SessionContext = createContext<SessionContext | null>(null)

const onboardingRoutes = [
    '/registration/account-setup',
    '/registration/confirm-pin',
    '/registration/secure-account',
    '/registration/recovery-phrase',
    '/registration/profile'
]

const publicRoutes = ['/']

const SessionProvider = ({children}: { children: ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const userSession = useSelector((state: RootState) => state.userSession)

    useEffect(() => {
        if (userSession.isLoggedIn) {
            if ([...onboardingRoutes, ...publicRoutes].indexOf(pathname) >= 0) {
                router.replace('/home')
            }
        } else {
            const onboardingRoute = onboardingRoutes[userSession.onboardingStep]

            if (userSession.isOnboarding || (userSession.isOnboarding && pathname !== onboardingRoute)) {
                router.replace(onboardingRoute + (userSession.onboardingParams ?? ''))
            } else {
                if (publicRoutes.indexOf(pathname) === -1) {
                    router.replace('/')
                }
            }
        }
    }, [userSession.isLoggedIn, userSession.isOnboarding, userSession.onboardingStep, userSession.onboardingParams])

    return (<SessionContext.Provider value={{}}>{children}</SessionContext.Provider>)
}

export default SessionProvider