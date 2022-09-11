/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { CitiesService, ICityData } from '../../services/cities/cities.service';
import { IUpsertPeopleData } from '../../services/people/people.service';
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
  data: IUpsertPeopleData,
}

export const PeopleForm: FC<IFormData> = ({ setInput, sendRequest, date, setDate, cityGuid, setCityGuid, data }) => {
  const [cities, setCities] = useState<ICityData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await CitiesService.getAllCities();

      setCities(data);
    })();
  }, []);
  
  return (
    <form
      onChange={setInput}
      onSubmit={(e) => {
        e.preventDefault();
        sendRequest();
      }}
    >
      <TextField value={data.name} name="name" placeholder="Name" />

      <TextField value={data.last_name} name="last_name" placeholder="Last name" />

      <TextField value={data.email} name="email" placeholder="Email" />

      <TextField value={data.cpf} name="cpf" placeholder="CPF" />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Birth date"
          value={date}
          onChange={(newValue) => setDate(moment(newValue.$d).format('YYYY-MM-DD'))}
          renderInput={(params) => <TextField {...params} value={data.birth_date} name="birth_date" />}
        />
      </LocalizationProvider>

      <Autocomplete
        options={cities}
        getOptionLabel={(option: ICityData) => option.name}
        onChange={(_, newValue) => setCityGuid(newValue?.guid)}
        value={cityGuid}
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

      <Button type='submit'>Submit</Button>
    </form>
  );
};
