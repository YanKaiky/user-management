/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IUpdateCityData } from '../../../services/cities/cities.service';
import { IStateData, StatesService } from '../../../services/states/states.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  stateGuid: IStateData,
  setStateGuid: (guid: string | undefined) => void,
  data: IUpdateCityData,
}

export const UpdateCityForm: FC<IFormData> = ({ setInput, sendRequest, stateGuid, setStateGuid, data }) => {
  const [states, setStates] = useState<IStateData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await StatesService.getAllStates();

      setStates(response);
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
            options={states}
            getOptionLabel={(option: IStateData) => option.name}
            onChange={(_, newValue) => setStateGuid(newValue?.guid)}
            value={stateGuid}
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
                label="State"
                name='state_guid'
                onChange={setInput}
                value={data.state_guid}
              />
            }
          />
        </Box>
      </form>
    </Box>
  );
};
