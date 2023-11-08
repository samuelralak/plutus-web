"use client"

import {useRouter} from "next/navigation";
import {FormEvent, startTransition, useState} from "react";
import {generateMnemonic} from "@/app/(public)/registration/actions";
import {classNames} from "@/utils";

const SecureAccount = () => {
    const router = useRouter()
    const [understood, setUnderstood] = useState<boolean>(false)

    const onInputChecked = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setUnderstood(target.checked)
    }

    const onShowPhrase = () => {
        startTransition(() => {
            (async () => {
                const [_, mnemonic] = await generateMnemonic()
                router.push(`/registration/recovery-phrase/${btoa(mnemonic)}`)
            })()
        })
    }

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Secure your account
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    A <strong>Secret Recovery Phrase</strong> is a master key to your account. It&apos;s a set of words
                    that ensures you never lose access. Keep it safe and private.
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2 rounded-md ">

                </div>
            </div>


            <div>
                <div className={'py-3.5 px-3 border-2 border-gray-100 rounded-xl my-5'}>
                    <div className="relative flex items-center">
                        <div className="flex h-6 items-center">
                            <input
                                name="understood"
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-gray-600 focus:ring-gray-600 rounded-full"
                                onChange={onInputChecked}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="text-gray-500 font-normal">
                                I understand that it is my responsibility to keep my recovery phrase safe and not share
                                it with anyone.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onShowPhrase}
                    disabled={!understood}
                    type="button"
                    className={classNames(understood ? 'bg-slate-800 hover:bg-gray-600' : 'bg-slate-300 cursor-no-drop', 'w-full rounded-lg  px-4 py-4 text-sm font-semibold text-white')}
                >
                    Show me
                </button>
            </div>
        </div>
    )
}

export default SecureAccount