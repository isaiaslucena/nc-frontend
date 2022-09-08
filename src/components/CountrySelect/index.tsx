import { useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { AppContext } from '../../context/appContext'
import countries from './countries'

const CountrySelect = () => {
  const { setCountryNumber } = useContext(AppContext)

  return (
    <Autocomplete
      id="country-select"
      sx={{ width: 250 }}
      options={countries}
      getOptionLabel={(option) => option.label}
      onChange={(_event: any, selectedOption: any) => {
        if (selectedOption?.phone) setCountryNumber(selectedOption.phone)
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}

export default CountrySelect
