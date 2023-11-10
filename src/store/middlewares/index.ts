import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {loginUser, setPasscode, signOutUser, updateUserProfile} from "@/store/reducers/user-session-reducer";
import {RootState} from "@/store";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";

export const sessionListenerMiddleware = createListenerMiddleware()

sessionListenerMiddleware.startListening({
    matcher: isAnyOf(setPasscode, updateUserProfile, loginUser, signOutUser),
    effect: (action, listenerApi) => {
        const actionTypes = [setPasscode, updateUserProfile, loginUser].map((action) => action.type)
        const sessionFromStorage = secureLocalStorage.getItem(constants.SESSION_KEY) as Record<string, any>

        if (actionTypes.includes(action.type)) {
            const { userSession } = listenerApi.getState() as RootState
            secureLocalStorage.setItem(constants.SESSION_KEY, {...sessionFromStorage, ...userSession})
        }

        if (action.type === signOutUser.type) {
            secureLocalStorage.removeItem(constants.SESSION_KEY)
        }
    },
})