/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { ICreateCityData } from '../../../services/cities/cities.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  data: ICreateCityData,
}

export const CreateCityForm: FC<IFormData> = ({ setInput, sendRequest, data }) => {
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

          <TextField sx={{ marginLeft: 0.5 }} value={data.state_guid} name="state_guid" label="State" fullWidth />
        </Box>
      </form>
    </Box>
  );
};
