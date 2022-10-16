/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { CountriesService, ICountryData } from '../../../services/countries/countries.service';
import { ICreateStateData } from '../../../services/states/states.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  countryGuid: ICountryData,
  setCountryGuid: (guid: string | undefined) => void,
  data: ICreateStateData,
}

export const CreateStateForm: FC<IFormData> = ({ setInput, sendRequest, countryGuid, setCountryGuid, data }) => {
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

          <TextField sx={{ marginLeft: 0.5 }} value={data.uf} name="uf" label="UF" fullWidth />
        </Box>

        <Box display='flex' marginTop={2}>
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
                label="Country"
                name='country_guid'
                onChange={setInput}
                value={data.country_guid}
              />
            }
          />
        </Box>
      </form>
    </Box>
  );
};
