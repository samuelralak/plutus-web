import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserProfile} from "@/resources";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";

enum OnboardingSteps {
    CreatePasscode = 0,
    ConfirmPasscode,
    RecoveryPhraseAgree,
    BackupRecoveryPhrase,
    CompleteProfile
}

interface UserSession {
    isLoggedIn: boolean
    hasPrivateKey: boolean
    isOnboarding: boolean
    hasPasscodeSet: boolean
    onboardingStep: OnboardingSteps
    onboardingParams?: string
    userProfile?: UserProfile
}

const initialState: UserSession = {
    isLoggedIn: false,
    hasPrivateKey: false,
    isOnboarding: false,
    hasPasscodeSet: false,
    onboardingStep: OnboardingSteps.CreatePasscode,
}

export const preloadSession = () => {
    const {keys, ...rest} = secureLocalStorage.getItem(constants.SESSION_KEY) as Record<string, any> || {}
    return {...initialState, ...rest} as UserSession
}

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        startOnboarding: (state) => {
            state.isOnboarding = true
        },
        nextOnboardingStep: (state, action: PayloadAction<{ params?: string }>) => {
            const currentStep = state.onboardingStep
            state.onboardingParams = action.payload?.params ?? ''

            // reset onboarding if we are on the final step
            if (!(currentStep === OnboardingSteps.CompleteProfile)) {
                state.onboardingStep = currentStep as number + 1
            }
        },
        previousOnboardingStep: (state, action: PayloadAction<{ params?: string }>) => {
            const currentStep = state.onboardingStep
            state.onboardingParams = action.payload?.params

            // only update state if we
            if (currentStep === OnboardingSteps.CreatePasscode) {
                state.isOnboarding = false
            } else {
                state.onboardingStep = currentStep as number - 1
            }
        },
        updateUserProfile: (state, action: PayloadAction<{ userProfile: UserProfile }>) => {
            state.userProfile = action.payload.userProfile
        },
        setPasscode: (state) => {
            state.hasPasscodeSet = true
        },
        loginUser: (state) => {
            // we only change state to login when user private key has been obtained
            state.isLoggedIn = true
            state.hasPrivateKey = true

            // reset onboarding
            state.isOnboarding = false
            state.onboardingStep = OnboardingSteps.CreatePasscode
        },
        signOutUser: (state) => initialState
    }
})

export const {
    startOnboarding,
    nextOnboardingStep,
    previousOnboardingStep,
    updateUserProfile,
    setPasscode,
    loginUser,
    signOutUser
} = userSessionSlice.actions

export default userSessionSlice.reducer