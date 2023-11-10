import {ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps, ReactNode} from "react";
import {classNames} from "@/utils";

interface Props {
    children: ReactNode,
    fullWidth?: boolean
}

const Button = ({children, fullWidth = true, ...props}: Props & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button
            className={classNames(fullWidth ? 'w-full ' : '', 'rounded-lg bg-slate-800 px-4.5 py-4 text-sm font-semibold text-white disabled:bg-slate-300 disabled:cursor-no-drop')}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button