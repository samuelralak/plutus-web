import {forwardRef, HTMLProps, ReactNode} from "react";
import {classNames} from "@/utils";
import {UseFormRegister} from "react-hook-form";

interface InputProps {
    label: ReactNode,
    error?: string | undefined,
}

const TextInput = forwardRef<HTMLInputElement, InputProps & HTMLProps<HTMLInputElement> & ReturnType<UseFormRegister<any>>>(({
                                                                                              label,
                                                                                              error,
                                                                                              ...props
                                                                                          }, ref) => {
    return (
        <div className="mt-3">
            <div
                className={classNames((error) ? 'ring-red-300 focus-within:ring-red-500' : 'ring-gray-300 focus-within:ring-gray-600', 'flex rounded-lg ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset w-full')}
            >
                <span
                    className="flex select-none items-center pl-3 text-gray-500 text-sm font-semibold"
                >
                    {label}
                </span>
                <input
                    {...props}
                    ref={ref}
                    className="block flex-1 border-0 bg-transparent py-4 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6 placeholder:text-sm"
                />
            </div>

            {error && (<p className="mt-2 text-sm text-red-600">{error as ReactNode}</p>)}
        </div>
    )
})

TextInput.displayName = 'TextInput'

export default TextInput