"use client"

import {useRouter} from "next/navigation";

const ConfirmPin = () => {
    const router = useRouter()

    return (
        <div className={'flex flex-col h-full'}>
            <div className={'flex-none'}>
                <h3 className={'font-semibold text-slate-700 text-xl'}>
                    Confirm pin
                </h3>

                <p className={'py-3 text-sm text-slate-500 font-medium'}>
                    Enter the 6 digit verification code sent to your email.
                </p>
            </div>

            <div className={'basis-full'}>
                <div className="relative mt-2 rounded-md ">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 11V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.71569 21.2843 5.40973 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.71569 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V11.8C2 12.9201 2 13.4802 2.21799 13.908C2.40973 14.2843 2.71569 14.5903 3.09202 14.782C3.51984 15 4.0799 15 5.2 15H11M12 10H12.005M17 10H17.005M7 10H7.005M19.25 17V15.25C19.25 14.2835 18.4665 13.5 17.5 13.5C16.5335 13.5 15.75 14.2835 15.75 15.25V17M12.25 10C12.25 10.1381 12.1381 10.25 12 10.25C11.8619 10.25 11.75 10.1381 11.75 10C11.75 9.86193 11.8619 9.75 12 9.75C12.1381 9.75 12.25 9.86193 12.25 10ZM17.25 10C17.25 10.1381 17.1381 10.25 17 10.25C16.8619 10.25 16.75 10.1381 16.75 10C16.75 9.86193 16.8619 9.75 17 9.75C17.1381 9.75 17.25 9.86193 17.25 10ZM7.25 10C7.25 10.1381 7.13807 10.25 7 10.25C6.86193 10.25 6.75 10.1381 6.75 10C6.75 9.86193 6.86193 9.75 7 9.75C7.13807 9.75 7.25 9.86193 7.25 10ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.0399 21 17.7599 20.891 17.546C20.7951 17.3578 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H15.6C15.0399 17 14.7599 17 14.546 17.109C14.3578 17.2049 14.2049 17.3578 14.109 17.546C14 17.7599 14 18.0399 14 18.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21Z" stroke="#002B36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <input
                        type="password"
                        name="email"
                        id="email"
                        className="block w-full rounded-lg border-0 py-4 pl-10 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 placeholder:text-sm"
                        placeholder="6-digit verification code"
                    />
                </div>
            </div>


            <div>
                <button
                    onClick={() => router.push('/registration/secure-account')}
                    type="button"
                    className="w-full rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default ConfirmPin