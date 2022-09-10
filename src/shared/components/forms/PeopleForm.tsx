import { FC, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { CitiesService, ICityData } from '../../services/cities/cities.service';

interface IFormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setInput: (event: any) => void,
  sendRequest: () => void,
  data: {
    name: string;
    last_name: string;
    email: string;
    cpf: string;
    birth_date: string;
    city_guid: string;
  }
}

export const PeopleForm: FC<IFormData> = ({ setInput, sendRequest, data }) => {
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
      <TextField onChange={setInput} value={data.name} name="name" placeholder="Name" />

      <TextField onChange={setInput} value={data.last_name} name="last_name" placeholder="Last name" />

      <TextField onChange={setInput} value={data.email} name="email" placeholder="Email" />

      <TextField onChange={setInput} value={data.cpf} name="cpf" placeholder="CPF" />

      <TextField onChange={setInput} value={data.birth_date} name="birth_date" placeholder="Birth date" />

      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300, margin: 1 }}
        options={cities}
        autoHighlight
        getOptionLabel={(option: ICityData) => option.name}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.name}
          </Box>
        )}
        renderInput={(params) => {
          console.log(params.inputProps);

          return (
            <TextField
              {...params}
              label="City"
              name='city_guid'
              value={data.city_guid}
              inputProps={{
                ...params.inputProps,
              }}
            />
          );
        }}
      />


      <Button type='submit'>Submit</Button>
    </form>
  );
};
