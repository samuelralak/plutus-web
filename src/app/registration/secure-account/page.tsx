"use client"

import {useRouter} from "next/navigation";

const SecureAccount = () => {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Secure your account
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    A <strong>Secret Recovery Phrase</strong> is a master key to your account.  It&apos;s a set of words that ensures you never lose access. Keep it safe and private.
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2 rounded-md ">

                </div>
            </div>


            <div>
                <div className={'py-5 px-3 border-2 border-gray-100 rounded-xl my-5'}>
                    <div className="relative flex items-center">
                        <div className="flex h-6 items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="text-gray-500 font-medium">
                                I understand that it is my responsibility to keep my recovery phrase safe and not share it with anyone.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => router.push('/registration/recovery-phrase')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    View my secret recovery phrase
                </button>
            </div>
        </div>
    )
}

export default SecureAccount