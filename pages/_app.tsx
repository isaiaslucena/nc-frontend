import { useContext, useEffect, useMemo } from 'react'
import type { AppProps } from 'next/app'
import AppContextProvider, { AppContext } from '../src/context/appContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useRouter } from 'next/router'
import firebaseConfig from '../firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import Container from '@mui/material/Container'
import { getLocalStorageData } from '../src/utils/manageLocalStorage'

const CustomAppContent = ({ Component, pageProps }: AppProps) => {
  const { setLoggedIn, setCurrentUser, setCurrentMode, currentMode } =
    useContext(AppContext)
  const router = useRouter()

  const currentTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: currentMode,
      },
    })
  }, [currentMode])

  useEffect(() => {
    const initializedApp = initializeApp(firebaseConfig)
    const auth = getAuth(initializedApp)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(`user is signed in!`)

        const userJwtToken = await getIdToken(user)
        const userIdFromFirebase = user.uid
        const userPhoneNumberFromFirebase = user.phoneNumber

        window.userJwtToken = userJwtToken

        let userInfo: any = {
          userId: userIdFromFirebase,
          phoneNumber: userPhoneNumberFromFirebase,
        }

        const response = await(
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userIdFromFirebase}`,
            {
              headers: {
                Authorization: `Bearer ${window.userJwtToken}`,
              },
            },
          ),
        ).json()
        if (response.id) {
          const { id, name, email } = response
          userInfo = { ...userInfo, id, name, email }
        }

        setLoggedIn(true)
        setCurrentUser(userInfo)

        if (router.pathname === '/') {
          router.push('/profile')
        }
      } else {
        console.log(`user is signed out!`)
        setLoggedIn(false)
        router.push('/')
      }
    })

    const localStorageTheme = JSON.parse(getLocalStorageData() as string)
    if (localStorageTheme) {
      setCurrentMode(localStorageTheme)
    }
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}

const CustomApp = (props: AppProps) => {
  return (
    <AppContextProvider>
      <CustomAppContent {...props} />
    </AppContextProvider>
  )
}

export default CustomApp
