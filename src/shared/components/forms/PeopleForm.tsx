import { FC } from 'react';
import { Button, TextField } from '@mui/material';

interface IFormData {
  setInput: () => unknown,
  sendRequest: () => unknown,
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

      <TextField onChange={setInput} value={data.city_guid} name="city_guid" placeholder="City" />

      <Button type='submit'>Submit</Button>
    </form>
  );
};
