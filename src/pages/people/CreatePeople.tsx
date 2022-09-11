/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePeopleForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/people/people.service';
import { ICityData } from '../../shared/services/cities/cities.service';
import { Dayjs } from 'dayjs';

interface IFormData {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
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
  const [cityGuid, setCityGuid] = useState<ICityData | any>();
  const [date, setDate] = useState<Dayjs | any>();

  const navigate = useNavigate();

  const setInput = (event: ITargetProps) => {
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
      birth_date: date,
      city_guid: cityGuid,
    };

    await PeopleService.createPeople(peopleReq);

    navigate('/people');
  };

  return (
    <BaseLayout
      icon='people'
      title='Create People'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/people')}
        />
      }
    >
      <CreatePeopleForm setInput={setInput} sendRequest={sendRequest} date={date} setDate={setDate} cityGuid={cityGuid} setCityGuid={setCityGuid} data={people} />
    </BaseLayout>
  );
};
