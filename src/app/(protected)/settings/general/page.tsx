"use client"

import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";

const Page = () => {
    const {userProfile} = useSelector((state: RootState) => state.userSession)

    return (
        <main className="px-4 pt-5 lg:px-0">
            <div className="mx-auto w-full space-y-16">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        This information will be displayed publicly.
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6">
                            <dt className="font-medium text-gray-900">Full name</dt>
                            <dd className="mt-1 flex justify-between gap-x-6">
                                <div className="text-gray-900">{userProfile?.displayName || `${userProfile?.firstName} ${userProfile?.lastName}`} </div>
                                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    <DocumentDuplicateIcon className={'h-5 w-5'} />
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="font-medium text-gray-900">Username</dt>
                            <dd className="mt-1 flex justify-between gap-x-6">
                                <div className="text-gray-900">{userProfile?.name}</div>
                                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    <DocumentDuplicateIcon className={'h-5 w-5'} />
                                </button>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">My Keys</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        You will require this to login or identify yourself on the network
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6">
                            <dt className="font-medium text-gray-900">Public</dt>
                            <dd className="mt-1 flex justify-between gap-x-6">
                                <div className="text-gray-900 w-3/4 overflow-hidden text-ellipsis">{userProfile?.npub} </div>
                                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    <DocumentDuplicateIcon className={'h-5 w-5'} />
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="font-medium text-gray-900">Private</dt>
                            <dd className="mt-1 flex justify-between gap-x-6">
                                <div className="text-gray-900">{/*display private key*/}</div>
                                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    <DocumentDuplicateIcon className={'h-5 w-5'} />
                                </button>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </main>)
}

export default Page