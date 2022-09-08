import Grid from '@mui/material/Grid'
import LogoutButton from '../src/components/LogoutButton'
import Profile from '../src/components/Profile'
import ToggleThemeIcon from '../src/components/ToggleThemeIcon'

const Home = () => {
  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item>
        <ToggleThemeIcon />
        <LogoutButton />
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Profile />
      </Grid>
    </Grid>
  )
}

export default Home
