/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/people/people.service';

interface IFormData {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
}

export const CreatePeople: FC = () => {
  const data = {
    name: '',
    last_name: '',
    email: '',
    cpf: '',
    birth_date: '',
    city_guid: '',
  };

  const [people, setPeople] = useState<IFormData>(data);

  const navigate = useNavigate();

  const setInput = (event: any) => {
    const { name, value } = event.target;

    const newPeople = {
      ...people,
      [name]: value,
    };

    setPeople(newPeople);
  };

  const sendRequest = async () => {
    const peopleReq = {
      ...people,
      birth_date: '2002-12-22'
    };
    
    await PeopleService.createPeople(peopleReq);
  };

  return (
    <BaseLayout
      icon='people'
      title='Create People'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => {
            sendRequest();
            navigate('/people');
          }}
          backButtonOnClick={() => navigate('/people')}
        />
      }
    >
      <form
        onChange={setInput}
        onSubmit={(e) => {
          e.preventDefault();
          sendRequest();
        }}
      >
        <TextField onChange={setInput} value={people.name} name="name" placeholder="Name" />

        <TextField onChange={setInput} value={people.last_name} name="last_name" placeholder="Last name" />

        <TextField onChange={setInput} value={people.email} name="email" placeholder="Email" />

        <TextField onChange={setInput} value={people.cpf} name="cpf" placeholder="CPF" />

        <TextField onChange={setInput} value={people.birth_date} name="birth_date" placeholder="Birth date" />

        <TextField onChange={setInput} value={people.city_guid} name="city_guid" placeholder="City" />

        <Button type='submit'>Submit</Button>
      </form>
    </BaseLayout>
  );
};
