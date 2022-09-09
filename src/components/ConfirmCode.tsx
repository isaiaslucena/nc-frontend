import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext'
import { PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
import { Grid, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { CheckCircle } from '@mui/icons-material'
import { useRouter } from 'next/router'

const ConfirmCode = () => {
  const router = useRouter()

  const { verificationId } = useContext(AppContext)
  const [code, setCode] = useState<string>('')
  const [helperText, setHelperText] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    setDisabled(!currentValue)
    setCode(event.target.value)
  }

  useEffect(() => {
    setHelperText('')
  }, [verificationId])

  const handleClickConfirmCode = (inputCode: string) => {
    setHelperText('')
    setIsLoading(true)

    const credential = PhoneAuthProvider.credential(verificationId, inputCode)
    const auth = getAuth()
    signInWithCredential(auth, credential)
      .then((response: any) => {
        router.push('/profile')
      })
      .catch((error: any) => {
        console.log('signInWithCredential error:', error.message)
        setHelperText(error.message.replace(/firebase: /gi, ''))
      })
      .finally(() => {
        setDisabled(true)
        setIsLoading(false)
      })
  }

  const inputColor = !!helperText && code ? 'error' : 'primary'
  const buttonText = isLoading ? `Please, wait...` : `Confirm code`

  return verificationId ? (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid
        item
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TextField
            id="input-code"
            label="Code"
            type="number"
            size="small"
            value={code}
            onChange={handleChange}
            error={!!helperText}
            color={inputColor}
          />
        </Grid>
        <Grid item>
          <LoadingButton
            id="confirm-code-button"
            loading={isLoading}
            disabled={disabled || isLoading}
            loadingPosition="end"
            endIcon={<CheckCircle />}
            variant="contained"
            onClick={() => handleClickConfirmCode(code)}
          >
            {buttonText}
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body2" component="span" color="error">
          {helperText}
        </Typography>
      </Grid>
    </Grid>
  ) : null
}

export default ConfirmCode
