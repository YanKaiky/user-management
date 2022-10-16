/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { ICreateCountryData } from '../../../services/countries/countries.service';
import { ContinentsService, IContinentData } from '../../../services/continents/continents.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  continentGuid: IContinentData,
  setContinentGuid: (guid: string | undefined) => void,
  data: ICreateCountryData,
}

export const CreateCountryForm: FC<IFormData> = ({ setInput, sendRequest, continentGuid, setContinentGuid, data }) => {
  const [continents, setContinents] = useState<IContinentData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await ContinentsService.getAllContinents();

      setContinents(response);
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
            options={continents}
            getOptionLabel={(option: IContinentData) => option.name}
            onChange={(_, newValue) => setContinentGuid(newValue?.guid)}
            value={continentGuid}
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
