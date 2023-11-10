"use client"

import {useRouter} from "next/navigation";
import {CloudIcon, KeyIcon} from "@heroicons/react/24/solid";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import {NotificationToastContext} from "@/components/NotificationToastProvider";
import {PasscodeAuthModalContext} from "@/components/PasscodeAuthModalProvider";
import {generateKeysFromMnemonic} from "@/app/(public)/registration/actions";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {AES} from 'crypto-js'
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import Button from "@/components/forms/Button";
import {useDispatch} from "react-redux";
import {nextOnboardingStep} from "@/store/reducers/user-session-reducer";

const Page = ({params}: { params: { mnemonic: string } }) => {
    const dispatch = useDispatch()
    const {showToast} = useContext(NotificationToastContext) as NotificationToastContext
    const {showPasscodeAuthorizationModal} = useContext(PasscodeAuthModalContext) as PasscodeAuthModalContext
    const mnemonic = atob(decodeURIComponent(params.mnemonic))

    const copyToClipboard = async (text: string) => {
        if (window.navigator && window.isSecureContext) {
            await window.navigator.clipboard.writeText(text)
            showToast({
                title: 'Copied to clipboard',
                icon: () => (<DocumentDuplicateIcon className="h-5 w-5" aria-hidden="true"/>)
            })
        }
    }

    const onContinue = () => showPasscodeAuthorizationModal({
        title: 'Confirm Backup',
        body: 'Enter your passcode to confirm you have backed up your secret recovery phrase.',
        callbackFunc: async (passcode?: string) => {
            const [_, {privateKey, publicKey}] = await generateKeysFromMnemonic(mnemonic)
            const session = secureLocalStorage.getItem(constants.SESSION_KEY) as Record<string, any> || {}
            await secureLocalStorage.setItem(constants.SESSION_KEY, {
                ...session, ...{
                    keys: {
                        publicKey,
                        privateKey: AES.encrypt(privateKey, btoa(passcode as string)).toString() // Is this the right way?
                    }
                }
            })
            dispatch(nextOnboardingStep({}))
        }
    })

    return (
        <>
            <div className={'flex flex-col h-full'}>
                <RegistrationHeader title="Your recovery phrase" description="Backup your secret recovery phrase" />

                <div className={'basis-full'}>
                    <div className="relative mt-2">
                        <div className="overflow-hidden bg-gray-50 rounded-xl">
                            <div className="px-4 py-5 sm:p-6 grid grid-cols-3 gap-2">
                                {mnemonic.split(' ').map((word, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-normal text-gray-600 justify-start w-full"
                                    >
                                    {index + 1}.&nbsp; <span className="text-center w-full font-medium">{word}</span>
                                </span>
                                ))}
                            </div>
                        </div>

                        <a onClick={() => copyToClipboard(mnemonic)}
                           className="text-xs flex items-center gap-1 my-2 font-medium cursor-pointer hover:underline"
                        >
                            <DocumentDuplicateIcon className={'h-4 w-4'}/> Copy to clipboard
                        </a>
                    </div>
                </div>

                <div>
                    <div className="py-3.5 px-3 border-2 border-gray-100 rounded-xl my-4">
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

                    <div className="py-3.5 px-3 border-2 border-gray-100 rounded-xl my-4">
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

                    <Button onClick={onContinue} type="button">Continue</Button>
                </div>
            </div>
        </>
    )
}

export default Page