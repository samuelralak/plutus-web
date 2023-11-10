"use client"

import {FormEvent, startTransition, useState} from "react";
import {generateMnemonic} from "@/app/(public)/registration/actions";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import Button from "@/components/forms/Button";
import {useDispatch} from "react-redux";
import {nextOnboardingStep} from "@/store/reducers/user-session-reducer";

const SecureAccount = () => {
    const dispatch = useDispatch()
    const [understood, setUnderstood] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onInputChecked = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setUnderstood(target.checked)
    }

    const onShowPhrase = () => {
        startTransition(() => {
            (async () => {
                setIsSubmitting(true)
                const [_, mnemonic] = await generateMnemonic()
                setIsSubmitting(false)
                dispatch(nextOnboardingStep({params: `/${btoa(mnemonic)}`}))
            })()
        })
    }

    return (
        <div className={'flex flex-col h-full'}>
            <RegistrationHeader title="Secure your account"
                                description="A Secret Recovery Phrase is a master key to your account. It's a set of words that ensures you never lose access. Keep it safe and private."
                                canGoBack={false}
            />

            <div className={'basis-full'}>
                <div className="relative mt-2 rounded-md ">
                    {/* demo video should go here*/}
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

                <Button onClick={onShowPhrase} disabled={!understood || isSubmitting} type="button">Show me</Button>
            </div>
        </div>
    )
}

export default SecureAccount