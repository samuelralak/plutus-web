"use client"

import {useRouter} from "next/navigation";
import {useContext, useState} from "react";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProfileSchema} from "@/schemas";
import TextInput from "@/components/forms/TextInput";
import {PasscodeAuthModalContext} from "@/components/PasscodeAuthModalProvider";
import useQueryProfile from "@/hooks/useQueryProfile";
import {AES, enc} from "crypto-js";
import {NDKPrivateKeySigner, NDKSigner} from "@nostr-dev-kit/ndk";
import {classNames} from "@/utils";

const keysFromStorage = (): [privateKey: string, publicKey: [hex: string, npub: string]] => {
    const session = secureLocalStorage.getItem(constants.SESSION_KEY) as Record<string, any>
    return [session.keys.privateKey, session.keys.publicKey.split(':')]
}

const Profile = () => {
    const router = useRouter()
    const [privateKey, [_hex, npub]] = keysFromStorage()
    const [ndkUser, fetching] = useQueryProfile(npub)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {...ndkUser.profile},
        resolver: zodResolver(ProfileSchema)
    })
    const {showPasscodeAuthorizationModal} = useContext(PasscodeAuthModalContext) as PasscodeAuthModalContext

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        showPasscodeAuthorizationModal({
            title: 'Confirm',
            body: 'Please enter your passcode to confirm profile update.',
            callbackFunc: async (passcode) => {
                setIsSubmitting(true)
                const [hexprivkey, _nsec] = AES.decrypt(privateKey, btoa(passcode as string)).toString(enc.Utf8).split(':')
                const signer = new NDKPrivateKeySigner(hexprivkey) as NDKSigner

                ndkUser.profile = {...ndkUser.profile, ...{...data, ...{pubkey: ndkUser.pubkey, npub: ndkUser.npub}}}
                ndkUser.ndk!.signer = signer
                await ndkUser.publish()
                setIsSubmitting(false)
                router.push('/settings/general')
            }
        })
    }

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
                    <TextInput label={'First name'}
                               error={errors?.firstName?.message as string}
                               placeholder="e.g Jack"
                               {...register('firstName')}
                    />

                    <TextInput label={'Last name'}
                               error={errors?.lastName?.message as string}
                               placeholder="e.g Dorsey"
                               {...register('lastName')}
                    />

                    <TextInput label={'@'}
                               error={errors?.name?.message as string}
                               placeholder="username"
                               {...register('name')}
                    />
                </div>
            </div>


            <div>
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={fetching || isSubmitting}
                    type="button"
                    className={classNames(!fetching ? 'bg-slate-800 hover:bg-gray-600' : 'bg-slate-300 cursor-no-drop', 'w-full rounded-lg  px-4 py-4 text-sm font-semibold text-white')}
                >
                    {fetching || isSubmitting ? 'Working...' : 'Finish'}
                </button>
            </div>
        </div>
    )
}

export default Profile