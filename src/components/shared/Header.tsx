"use client"

import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon} from '@heroicons/react/20/solid'
import {BellIcon, XMarkIcon,} from '@heroicons/react/24/outline'
import Link from "next/link";


const navigation = [
    {name: 'Home', href: '/home'},
    {name: 'Settings', href: '/settings/general'},
    {name: 'About', href: '#'},
]

export default function Header() {
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
                            <img
                                className="h-8 w-8 rounded-full bg-gray-800"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
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
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    )
}
