import { ReactNode, useContext, useEffect, useState } from 'react'

import SendIcon from '@mui/icons-material/Send'
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LoadingButton from '@mui/lab/LoadingButton'
import * as firebase from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  Auth,
  ConfirmationResult,
  getIdTokenResult,
} from 'firebase/auth'
import { AppContext } from '../context/appContext'
import ConfirmCode from './ConfirmCode'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ReceiveCode = () => {
  const { countryNumber, phoneNumber, setVerificationId } =
    useContext(AppContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState(true)
  const [helperText, setHelperText] = useState<string>('')

  useEffect(() => {
    const windowContext: any = window
    setTimeout(() => {
      const auth = getAuth()
      if (!windowContext.recaptchaVerifier) {
        const newRecaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            callback: (recaptchaResponse: string) => {
              setDisabled(false)
            },
          },
          auth,
        )
        windowContext.recaptchaVerifier = newRecaptchaVerifier

        newRecaptchaVerifier.render()
      }
    }, 500)
  }, [])

  const handleClickReceiveCode = (inputPhoneNumber: string): void => {
    setHelperText('')
    setIsLoading(true)
    const windowContext: any = window

    const auth = getAuth()
    signInWithPhoneNumber(auth, inputPhoneNumber, windowContext.recaptchaVerifier)
      .then((confirmationResult: ConfirmationResult) => {
        setDisabled(true)
        setVerificationId(confirmationResult.verificationId)
      })
      .catch((error) => {
        console.log('signInWithPhoneNumber error:', error)
        setDisabled(true)
        setHelperText(error.message.replace(/firebase: /gi, ''))
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Grid item>
        <div id="recaptcha-container"></div>
      </Grid>
      <Grid item>
        <LoadingButton
          id="receive-code-button"
          loading={isLoading}
          disabled={disabled || isLoading || (!countryNumber && !phoneNumber)}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          onClick={() =>
            handleClickReceiveCode(`+${countryNumber}${phoneNumber}`)
          }
        >
          {isLoading ? `Please, wait...` : `Receive code`}
        </LoadingButton>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="error">
          {helperText}
        </Typography>
      </Grid>

      <ConfirmCode />
    </>
  )
}

export default ReceiveCode
