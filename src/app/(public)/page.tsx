"use client"

import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Welcome
                </h3>
            </div>

            <div className={'basis-full'}>
                <div className={'flex flex-col h-full'}>
                    <div className={'basis-full flex  mx-auto content-center'}>
                        <h1 className={'text-4xl font-bold w-full text-center self-center'}>
                            [Plutus]
                        </h1>
                    </div>
                    <div className={'py-3 text-sm font-medium text-slate-500 text-center'}>
                        <p>Peer-to-Peer Personal Debt Tracking tailored for friends and family.</p>
                    </div>
                </div>
            </div>
            <div>
                <button
                    onClick={() => router.push('/registration/account-setup')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Get started
                </button>
            </div>
        </div>
    )
}
