/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { IUpdateContinentData } from '../../../services/continents/continents.service';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  data: IUpdateContinentData,
}

export const UpdateContinentForm: FC<IFormData> = ({ setInput, sendRequest, data }) => {
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
        </Box>
      </form>
    </Box>
  );
};
