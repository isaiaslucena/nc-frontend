import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import ClearIcon from '@mui/icons-material/Clear'
import { AppContext } from '../context/appContext'

export default function PhoneNumber() {
  const { phoneNumber, setPhoneNumber } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleClickClearPhoneNumber = () => {
    setPhoneNumber('')
  }

  return (
    <FormControl sx={{ m: 1, width: '38ch' }} variant="outlined">
      <InputLabel htmlFor="phone-number-input">Phone Number</InputLabel>
      <OutlinedInput
        id="phone-number-input"
        label="Phone Number"
        type="number"
        value={phoneNumber}
        onChange={handleChange}
        endAdornment={
          phoneNumber.length > 1 ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear phone number"
                onClick={handleClickClearPhoneNumber}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
    </FormControl>
  )
}
