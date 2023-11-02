"use client"

import {useRouter} from "next/navigation";
import {CloudIcon, ExclamationTriangleIcon, KeyIcon} from "@heroicons/react/24/solid";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";

const RecoveryPhrase = () => {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Your recovery phrase
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    Backup your secret recovery phrase
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2">
                    <div className="overflow-hidden bg-gray-50 rounded-xl">
                        <div className="px-4 py-5 sm:p-6 grid grid-cols-4 gap-2">
                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>

                            <span
                                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 justify-center">
                                Badge
                            </span>
                        </div>
                    </div>

                    <span className={'text-xs flex items-center gap-1 my-2 font-medium cursor-pointer'}><DocumentDuplicateIcon className={'h-4 w-4'} /> Copy to clipboard</span>
                </div>
            </div>


            <div>
                <div className="rounded-xl p-4 my-4 border-2 border-gray-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CloudIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-500">Cloud back up</h3>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Protect your recovery phrase on a cloud storage such as iCloud
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl p-4 my-4 border-2 border-gray-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-500">Manual back up</h3>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Write down your recovery phrase and store somewhere safe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/registration/profile')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default RecoveryPhrase