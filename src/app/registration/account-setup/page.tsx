"use client"

import {useRouter} from "next/navigation";
import { EnvelopeIcon } from '@heroicons/react/20/solid'

const AccountSetup = () => {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Account setup
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    You will receive a 6 digit verification code when you submit your email.
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2 rounded-md ">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-lg border-0 py-4 pl-10 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 placeholder:text-sm"
                        placeholder="Email"
                    />
                </div>
            </div>


            <div>
                <button
                    onClick={() => router.push('/registration/confirm-pin')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default AccountSetup