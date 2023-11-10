import {ArrowLeftIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {previousOnboardingStep, signOutUser} from "@/store/reducers/user-session-reducer";

interface Props {
    title: string,
    canGoBack?: boolean,
    description?: string
}

const RegistrationHeader = ({title, description, canGoBack = true}: Props) => {
    const dispatch = useDispatch()

    const onGoBack = () => {
        if (canGoBack) {
            dispatch(previousOnboardingStep({}))
            return
        }

        dispatch(signOutUser())
    }

    return (
        <div className="flex-none">
            <div className="flex items-center">
                <a onClick={onGoBack} className="mr-2">
                    {canGoBack
                        ? (<ArrowLeftIcon className="h-5 w-5 text-slate-500"/>)
                        : (<XMarkIcon className="h-6 w-6 text-slate-500"/>)
                    }
                </a>

                <h3 className="font-semibold text-slate-700 text-xl">{title}</h3>
            </div>

            {description && (
                <p className={'py-3 text-sm text-slate-500 font-medium'}>{description}</p>
            )}
        </div>

    )
}

export default RegistrationHeader