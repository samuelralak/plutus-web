"use client"

import {useRouter} from "next/navigation";
import {CloudIcon, ExclamationTriangleIcon, KeyIcon} from "@heroicons/react/24/solid";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";

const Profile = () => {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Complete your profile
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    Fill in your details to make the most of your experience.
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2">
                    <div className="mt-3">
                        <div className="flex rounded-lg ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 text-sm font-semibold">First name</span>
                            <input
                                type="text"
                                name="company-website"
                                id="company-website"
                                className="block flex-1 border-0 bg-transparent py-4 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6 placeholder:text-sm"
                                placeholder="e.g Jack"
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="flex rounded-lg ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 text-sm font-semibold">Last name</span>
                            <input
                                type="text"
                                name="company-website"
                                id="company-website"
                                className="block flex-1 border-0 bg-transparent py-4 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6 placeholder:text-sm"
                                placeholder="e.g Dorsey"
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="flex rounded-lg ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 text-sm font-semibold">@</span>
                            <input
                                type="text"
                                name="company-website"
                                id="company-website"
                                className="block flex-1 border-0 bg-transparent py-4 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6 placeholder:text-sm"
                                placeholder="username"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <button
                    onClick={() => router.push('/registration/profile')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Finish
                </button>
            </div>
        </div>
    )
}

export default Profile