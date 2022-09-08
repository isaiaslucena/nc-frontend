import { useContext, useMemo, useState } from 'react'
import Head from 'next/head'
import { AppContext, CurrentUserType } from '../context/appContext'
import { FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

const Profile = () => {
  const { currentUser, setCurrentUser, loggedIn } = useContext(AppContext)

  const [nameIsValid, setNameIsValid] = useState<boolean>(false)
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useMemo(() => {
    if (currentUser?.name) {
      setNameIsValid(true)
    }

    if (currentUser?.email) {
      setEmailIsValid(true)
    }
  }, [loggedIn])

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value

    if (inputName.length > 0) {
      setNameIsValid(true)
    } else {
      setNameIsValid(false)
    }

    setCurrentUser((prevCurrentUser: CurrentUserType) => ({
      ...prevCurrentUser,
      name: event.target.value,
    }))
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value

    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regex.test(inputEmail)) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }

    setCurrentUser((prevCurrentUser: CurrentUserType) => ({
      ...prevCurrentUser,
      email: event.target.value,
    }))
  }

  const handleClickButton = async () => {
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.userJwtToken}`,
      },
      body: JSON.stringify(currentUser),
    }
    const response = await (
      await fetch('http://localhost:3000/user', requestOptions)
    ).json()

    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="number-input">Phone</InputLabel>
          <OutlinedInput
            id="number-input"
            label="Phone"
            readOnly
            value={currentUser?.phoneNumber ? currentUser?.phoneNumber : ''}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <OutlinedInput
            id="name-input"
            label="Name"
            readOnly={isLoading}
            value={currentUser?.name ? currentUser?.name : ''}
            onChange={handleChangeName}
            error={!nameIsValid}
            color={!nameIsValid ? 'error' : 'primary'}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <OutlinedInput
            id="email-input"
            label="Email"
            readOnly={isLoading}
            value={currentUser?.email ? currentUser?.email : ''}
            onChange={handleChangeEmail}
            error={!emailIsValid}
            color={!emailIsValid ? 'error' : 'primary'}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <LoadingButton
          id="receive-code-button"
          loading={isLoading}
          disabled={!(nameIsValid && emailIsValid)}
          loadingPosition="end"
          endIcon={<SaveIcon />}
          variant="contained"
          onClick={handleClickButton}
        >
          {isLoading ? `saving` : `save`}
        </LoadingButton>
      </Grid>
    </>
  )
}

export default Profile
