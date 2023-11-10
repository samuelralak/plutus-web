import {configureStore} from "@reduxjs/toolkit";
import userSessionReducer, {preloadSession} from "@/store/reducers/user-session-reducer";
import {sessionListenerMiddleware} from "@/store/middlewares";

const preloadedSession = preloadSession()

const store = configureStore({
    preloadedState: {
        userSession: preloadedSession,
    },
    reducer: {
        userSession: userSessionReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([
            sessionListenerMiddleware.middleware,
        ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store