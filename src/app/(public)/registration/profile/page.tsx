"use client"

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
import {useDispatch} from "react-redux";
import {loginUser, updateUserProfile} from "@/store/reducers/user-session-reducer";
import {UserProfile} from "@/resources";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import Button from "@/components/forms/Button";

const keysFromStorage = (): [privateKey: string, publicKey: [hex: string, npub: string]] => {
    const session = secureLocalStorage.getItem(constants.SESSION_KEY) as Record<string, any>
    return [session.keys.privateKey, session.keys.publicKey.split(':')]
}

const Profile = () => {
    const dispatch = useDispatch()

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

                ndkUser.profile = {...ndkUser.profile, ...{...data, ...{
                    pubkey: ndkUser.pubkey, npub: ndkUser.npub, displayName: `${data.firstName} ${data.lastName}`
                }}}
                ndkUser.ndk!.signer = signer
                await ndkUser.publish()
                setIsSubmitting(false)

                dispatch(updateUserProfile({userProfile: ndkUser.profile as UserProfile}))
                dispatch(loginUser())
            }
        })
    }

    return (
        <div className={'flex flex-col h-full'}>
            <RegistrationHeader
                title={'Complete your profile'}
                description={'Fill in your details to make the most of your experience.'}
                canGoBack={false}
            />

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
                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={fetching || isSubmitting}
                    type="button"
                >
                    {fetching || isSubmitting ? 'Working...' : 'Finish'}
                </Button>
            </div>
        </div>
    )
}

export default Profile