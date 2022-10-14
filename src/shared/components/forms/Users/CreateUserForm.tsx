/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { CitiesService, ICityData } from '../../../services/cities/cities.service';
import { ICreateUserData } from '../../../services/users/users.service';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface IFormData {
  setInput: (event: any) => void,
  sendRequest: () => void,
  date: any,
  setDate: (date: any) => void,
  cityGuid: ICityData,
  setCityGuid: (guid: string | undefined) => void,
  data: ICreateUserData,
}

export const CreateUserForm: FC<IFormData> = ({ setInput, sendRequest, date, setDate, cityGuid, setCityGuid, data }) => {
  const [cities, setCities] = useState<ICityData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await CitiesService.getAllCities();

      setCities(response);
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

          <TextField sx={{ marginLeft: 0.5 }} value={data.last_name} name="last_name" label="Last name" fullWidth />
        </Box>

        <Box display='flex' marginTop={2}>
          <TextField sx={{ marginRight: 0.5 }} value={data.email} name="email" label="Email" fullWidth />

          <TextField sx={{ marginLeft: 0.5 }} value={data.cpf} type='email' name="cpf" label="CPF" fullWidth />
        </Box>

        <Box display='flex' marginTop={2}>
          <Autocomplete
            openText='Open'
            closeText='Close'
            noOptionsText='No Options'
            loadingText='Loading...'
            disablePortal
            options={cities}
            getOptionLabel={(option: ICityData) => option.name}
            onChange={(_, newValue) => setCityGuid(newValue?.guid)}
            value={cityGuid}
            sx={{ marginRight: 0.5 }}
            fullWidth
            renderOption={(props, option) => (
              <Box
                {...props}
                key={option.guid}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              >
                {`${option.name} (${option.uf})`}
              </Box>
            )}
            renderInput={(params) =>
              <TextField
                {...params}
                label="City"
                name='city_guid'
                onChange={setInput}
                value={data.city_guid}
              />
            }
          />

          <LocalizationProvider sx={{ marginLeft: 0.5 }} dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth date"
              value={date}
              onChange={(newValue) => setDate(moment(newValue.$d).format('YYYY-MM-DD'))}
              renderInput={(params) => <TextField {...params} value={data.birth_date} name="birth_date" />}
            />
          </LocalizationProvider>
        </Box>
      </form>
    </Box>
  );
};
