import { useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { AppContext } from '../context/appContext'
import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const LogoutButton = () => {
  const {
    setCurrentUser,
    setLoggedIn,
    setCountryNumber,
    setPhoneNumber,
    setVerificationId,
  } = useContext(AppContext)

  const handleClickLogoutButton = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        console.log('successfully signed out!')
        setCurrentUser(null)
        setLoggedIn(false)
        setCountryNumber('')
        setPhoneNumber('')
        setVerificationId('')
      })
      .catch((error) => {
        console.log('signOut function error', error)
      })
  }

  return (
    <IconButton aria-label="logout" onClick={handleClickLogoutButton}>
      <ExitToAppIcon />
    </IconButton>
  )
}

export default LogoutButton
