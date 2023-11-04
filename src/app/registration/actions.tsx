'use server'

import * as bcrypt from 'bcrypt'
import constants from "@/constants";
import {cookies} from "next/headers";

export const submitPasscode = async (passcode: number) => {
    const hash = await bcrypt.hash(passcode.toString(), constants.SALT_ROUNDS);
    cookies().delete(constants.PASSCODE_HASH_KEY)
    cookies().set(constants.PASSCODE_HASH_KEY, hash, {secure: constants.ENV === 'production'})
    return hash
}

export const confirmPasscode = async (passcode: number) => {
    const passcodeHash = cookies().get(constants.PASSCODE_HASH_KEY)
    const match = await bcrypt.compare(passcode.toString(), passcodeHash?.value!);

    if (match) {
        cookies().delete(constants.PASSCODE_HASH_KEY)
        return [match, passcodeHash?.value!]
    }

    return [match, undefined]
}