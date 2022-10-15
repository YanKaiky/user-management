/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { CountriesService, ICountryData, ICreateCountryData } from '../../../services/countries/countries.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  countryGuid: ICountryData,
  setCountryGuid: (guid: string | undefined) => void,
  data: ICreateCountryData,
}

export const CreateCountryForm: FC<IFormData> = ({ setInput, sendRequest, countryGuid, setCountryGuid, data }) => {
  const [countries, setCountries] = useState<ICountryData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await CountriesService.getAllCountries();

      setCountries(response);
    })();
  }, []);

  return (
    <Box sx={{ m: 1 }} >
      <form
        onChange={setInput}
        onSubmit={(e) => {
          e.preventDefault();
          sendRequest();
        }}
      >
        <Box display='flex'>
          <TextField sx={{ marginRight: 0.5 }} value={data.name} name="name" label="Name" fullWidth />

          <Autocomplete
            openText='Open'
            closeText='Close'
            noOptionsText='No Options'
            loadingText='Loading...'
            disablePortal
            options={countries}
            getOptionLabel={(option: ICountryData) => option.name}
            onChange={(_, newValue) => setCountryGuid(newValue?.guid)}
            value={countryGuid}
            sx={{ marginLeft: 0.5 }}
            fullWidth
            renderOption={(props, option) => (
              <Box
                {...props}
                key={option.guid}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              >
                {option.name}
              </Box>
            )}
            renderInput={(params) =>
              <TextField
                {...params}
                label="Continent"
                name='continent_guid'
                onChange={setInput}
                value={data.continent_guid}
              />
            }
          />
        </Box>
      </form>
    </Box>
  );
};
