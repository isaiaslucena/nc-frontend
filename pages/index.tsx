import type { NextPage } from 'next'
import Head from 'next/head'
import { Grid, Typography } from '@mui/material'
import CountrySelect from '../src/components/CountrySelect'
import PhoneNumber from '../src/components/PhoneNumber'
import ReceiveCode from '../src/components/ReceiveCode'
import ToggleThemeIcon from '../src/components/ToggleThemeIcon'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login with phone number</title>
      </Head>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Grid item>
          <ToggleThemeIcon />
        </Grid>
        <Grid item>
          <Typography variant="h5">Login with phone number</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CountrySelect />
          </Grid>
          <Grid item>
            <PhoneNumber />
          </Grid>
        </Grid>
        <ReceiveCode />
      </Grid>
    </>
  )
}

export default Home
