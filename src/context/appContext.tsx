import { createContext, useState } from 'react'
import { PaletteMode } from '@mui/material'
import { ModeTypeEnum } from '../theme/themesEnum'

export type CurrentUserType = {
  id: string
  userId: string
  name: string
  email: string
  phoneNumber: string
} | null

interface AppContextInterface {
  currentMode: PaletteMode
  toggleColorMode: () => void
  setCurrentMode: (inputMode: PaletteMode) => void
  countryNumber: string
  setCountryNumber: (inputCountryNumber: string) => void
  phoneNumber: string
  setPhoneNumber: (inputPhoneNumber: string) => void
  verificationId: string
  setVerificationId: (inputVerificationId: string) => void
  loggedIn: boolean
  setLoggedIn: (inputLoggedIn: boolean) => void
  currentUser: CurrentUserType
  setCurrentUser: (inputCurrentUser: any) => void
  userToken: string
  setUserToken: (inputToken: string) => void
}

const AppContextInitialState = {
  currentMode: ModeTypeEnum.DARK,
  toggleColorMode: () => {
    // nothing here
  },
  setCurrentMode: () => {
    // nothing here
  },
  countryNumber: '',
  setCountryNumber: () => {
    // nothing here
  },
  phoneNumber: '',
  setPhoneNumber: () => {
    // nothing here
  },
  verificationId: '',
  setVerificationId: () => {
    // nothing here
  },
  loggedIn: false,
  setLoggedIn: () => {
    // nothing here
  },
  currentUser: null,
  setCurrentUser: () => {
    // nothing here!
  },
  userToken: "",
  setUserToken: () => {
    // nothing here!
  },
}

export const AppContext = createContext<AppContextInterface>(
  AppContextInitialState,
)

const AppContextProvider = ({ children }: any) => {
  const [currentMode, setCurrentMode] = useState<PaletteMode>('light')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [countryNumber, setCountryNumber] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  const [userToken, setUserToken] = useState('')

  const handleSetCurrentUser = (inputCurrentUser: CurrentUserType) =>
    setCurrentUser(inputCurrentUser)

  const handleToggleColorMode = () => {
    setCurrentMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const updateProneNumber = (inputPhoneNumber: string) =>
    setPhoneNumber(inputPhoneNumber)

  const handleSetCurrentMode = (inputMode: PaletteMode) =>
    setCurrentMode(inputMode)

  return (
    <AppContext.Provider
      value={{
        currentMode,
        toggleColorMode: handleToggleColorMode,
        setCurrentMode: handleSetCurrentMode,
        countryNumber,
        setCountryNumber,
        phoneNumber,
        setPhoneNumber: updateProneNumber,
        verificationId,
        setVerificationId,
        loggedIn,
        setLoggedIn,
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
