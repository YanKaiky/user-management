/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { IUpdateCityData } from '../../../services/cities/cities.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  data: IUpdateCityData,
}

export const UpdateCityForm: FC<IFormData> = ({ setInput, sendRequest, data }) => {
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
      </form>
    </Box>
  );
};
