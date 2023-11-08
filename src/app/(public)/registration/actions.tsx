'use server'

import * as bcrypt from 'bcrypt'
import constants from "@/constants";
import {cookies} from "next/headers";
import {getPublicKey, nip06, nip19} from "nostr-tools";

export const submitPasscode = async (passcode: number): Promise<string> => {
    const hash = await bcrypt.hash(passcode.toString(), constants.SALT_ROUNDS);
    cookies().delete(constants.PASSCODE_HASH_KEY)
    cookies().set(constants.PASSCODE_HASH_KEY, hash, {secure: constants.ENV === 'production'})
    return hash
}

export const confirmPasscode = async (passcode: number, hash?: string): Promise<[boolean, string | undefined]> => {
    const passcodeHash = hash ?? cookies().get(constants.PASSCODE_HASH_KEY)?.value!
    const match = await bcrypt.compare(passcode.toString(), passcodeHash);

    if (match) {
        cookies().delete(constants.PASSCODE_HASH_KEY)
        return [match, passcodeHash]
    }

    return [match, undefined]
}

export const generateMnemonic = async (): Promise<[boolean, string]> => {
    const mnemonic = nip06.generateSeedWords()
    return [true, mnemonic]
}

export const generateKeysFromMnemonic = async (mnemonic: string): Promise<[boolean, {
    privateKey: string,
    publicKey: string
}]> => {
    const privateKey = nip06.privateKeyFromSeedWords(mnemonic)
    const publicKey = getPublicKey(privateKey)

    return [true, {
        publicKey: `${publicKey}:${nip19.npubEncode(publicKey)}`,
        privateKey: `${privateKey}:${nip19.nsecEncode(privateKey)}`
    }]
}