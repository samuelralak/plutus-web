"use client"

import {createContext, Fragment, ReactNode, startTransition, useRef, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasscodeSchema} from "@/schemas";
import {confirmPasscode} from "@/app/registration/actions";
import {Dialog, Transition} from "@headlessui/react";
import {classNames} from "@/utils";
import {ExclamationCircleIcon, XCircleIcon, XMarkIcon} from "@heroicons/react/20/solid";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";

interface ModalOpts {
    title: string
    body: string,
    callbackFunc?: (passcode?: string) => void | Promise<void>
}

export interface PasscodeAuthModalContext {
    showPasscodeAuthorizationModal: (opts: ModalOpts) => void
}

export const PasscodeAuthModalContext = createContext<PasscodeAuthModalContext | null>(null)

const PasscodeAuthModalProvider = ({children}: { children: ReactNode }) => {
    const [show, setShow] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [modalOpts, setModalOpts] = useState<ModalOpts>({title: '', body: ''})
    const cancelButtonRef = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors, isDirty, isValid}
    } = useForm({resolver: zodResolver(PasscodeSchema)})

    const showPasscodeAuthorizationModal = (opts: ModalOpts) => {
        setModalOpts({...modalOpts, ...opts})
        setShow(true)
    }

    const hidePasscodeAuthorizationModal = () => {
        setShow(false)
        const timeout = setTimeout(() => {
            resetField('passcode')
            setModalOpts({title: '', body: ''})
            clearTimeout(timeout)
        }, 1000)
    }

    const onSubmit: SubmitHandler<FieldValues> = ({passcode}) => {
        startTransition(() => {
            (async () => {
                const passcodeHash = secureLocalStorage.getItem(constants.PASSCODE_HASH_KEY) as string
                const [match, _] = await confirmPasscode(passcode, passcodeHash)

                if (!match) {
                    setError(true)
                    return
                }

                if (modalOpts?.callbackFunc) {
                    await modalOpts?.callbackFunc(passcode)
                }
                hidePasscodeAuthorizationModal()
                setError(false)
            })()
        })
    }

    return (
        <>
            <PasscodeAuthModalContext.Provider value={{showPasscodeAuthorizationModal}}>
                {children}
            </PasscodeAuthModalContext.Provider>

            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" static initialFocus={cancelButtonRef} onClose={() => null}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                {modalOpts.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {modalOpts.body}
                                                </p>
                                            </div>

                                            {error && (<div className="rounded-lg bg-red-50 p-4 my-5">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <XCircleIcon className="h-5 w-5 text-red-400"
                                                                     aria-hidden="true"/>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-red-800">
                                                            Wrong or invalid passcode
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto pl-3">
                                                        <div className="-mx-1.5 -my-1.5">
                                                            <button
                                                                onClick={() => {
                                                                }}
                                                                type="button"
                                                                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                                            >
                                                                <span className="sr-only">Dismiss</span>
                                                                <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}

                                            <div className="relative my-5 rounded-md ">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg className="h-5 w-5 text-gray-400" aria-hidden="true" width="24"
                                                         height="24"
                                                         viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M22 11V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.71569 21.2843 5.40973 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.71569 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V11.8C2 12.9201 2 13.4802 2.21799 13.908C2.40973 14.2843 2.71569 14.5903 3.09202 14.782C3.51984 15 4.0799 15 5.2 15H11M12 10H12.005M17 10H17.005M7 10H7.005M19.25 17V15.25C19.25 14.2835 18.4665 13.5 17.5 13.5C16.5335 13.5 15.75 14.2835 15.75 15.25V17M12.25 10C12.25 10.1381 12.1381 10.25 12 10.25C11.8619 10.25 11.75 10.1381 11.75 10C11.75 9.86193 11.8619 9.75 12 9.75C12.1381 9.75 12.25 9.86193 12.25 10ZM17.25 10C17.25 10.1381 17.1381 10.25 17 10.25C16.8619 10.25 16.75 10.1381 16.75 10C16.75 9.86193 16.8619 9.75 17 9.75C17.1381 9.75 17.25 9.86193 17.25 10ZM7.25 10C7.25 10.1381 7.13807 10.25 7 10.25C6.86193 10.25 6.75 10.1381 6.75 10C6.75 9.86193 6.86193 9.75 7 9.75C7.13807 9.75 7.25 9.86193 7.25 10ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.0399 21 17.7599 20.891 17.546C20.7951 17.3578 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H15.6C15.0399 17 14.7599 17 14.546 17.109C14.3578 17.2049 14.2049 17.3578 14.109 17.546C14 17.7599 14 18.0399 14 18.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21Z"
                                                            stroke="#002B36" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="password"
                                                    className={classNames((isDirty && !isValid) ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-gray-600', 'block w-full rounded-lg border-0 py-3.5 pl-10 text-gray-900 ring-2 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm sm:leading-6 placeholder:text-sm')}
                                                    placeholder="6-digit passcode"
                                                    {...register('passcode')}
                                                />
                                                {isDirty && !isValid && (
                                                    <div
                                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"
                                                                               aria-hidden="true"/>
                                                    </div>
                                                )}

                                            </div>
                                            {errors.passcode?.message && (
                                                <p className="mt-2 text-sm text-red-600">{errors.passcode?.message as ReactNode}</p>)}
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-lg bg-slate-800 hover:bg-gray-600 px-5 py-3.5 text-sm font-semibold text-white sm:ml-3 sm:w-auto"
                                            onClick={handleSubmit(onSubmit)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={hidePasscodeAuthorizationModal}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default PasscodeAuthModalProvider