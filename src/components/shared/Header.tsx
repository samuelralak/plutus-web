"use client"

import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon} from '@heroicons/react/20/solid'
import {BellIcon, XMarkIcon,} from '@heroicons/react/24/outline'
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {signOutUser} from "@/store/reducers/user-session-reducer";


const navigation = [
    {name: 'Home', href: '/home'},
    {name: 'Settings', href: '/settings/general'},
    {name: 'About', href: '/'},
]

export default function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)

    return (
        <>
            <header className="absolute inset-x-0 top-0 flex h-16 border-b border-gray-900/10">
                <div
                    className="sm:mx-auto flex w-full h-full sm:max-w-sm items-center justify-between px-4 sm:px-6 lg:px-0">
                    <div className="flex flex-1 items-center gap-x-6">
                        <button type="button" className="-m-3 p-3" onClick={() => setMobileMenuOpen(true)}>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true"/>
                        </button>
                        <h1 className="w-auto font-bold text-xl">[Plutus]</h1>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-x-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your profile</span>
                            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
                <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 bg-slate-300"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                        <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                            <div className="-ml-0.5">
                                <Link href="/home" className="-m-1.5 block p-1.5">
                                    <span className="sr-only">Plutus</span>
                                    <h1 className="w-auto font-bold text-xl">[Plutus]</h1>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2 space-y-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    onClick={() => {
                                        router.push(item.href)
                                        const timeout = setTimeout(() => {
                                            setMobileMenuOpen(false)
                                        }, 500)

                                    }}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-slate-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                onClick={() => dispatch(signOutUser())}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-slate-500 hover:bg-gray-50"
                            >
                                Sign out
                            </a>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    )
}
