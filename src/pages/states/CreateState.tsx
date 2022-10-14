/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { UsersService } from '../../shared/services/users/users.service';
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

export const CreateState: FC = () => {
  const data = {
    name: '',
    last_name: '',
    email: '',
    cpf: '',
    birth_date: '',
    city_guid: '',
  };

  const [user, setUser] = useState<IFormData>(data);
  const [cityGuid, setCityGuid] = useState<ICityData | any>();
  const [date, setDate] = useState<Dayjs | any>();

  const navigate = useNavigate();

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newUser = {
      ...user,
      [name]: value,
    };

    setUser(newUser);
  };

  const sendRequest = async () => {
    const userReq = {
      ...user,
      birth_date: date,
      city_guid: cityGuid,
    };

    await UsersService.createUser(userReq);

    navigate('/users');
  };

  return (
    <BaseLayout
      icon='people'
      title='Create User'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/users')}
        />
      }
    >
      <CreateUserForm setInput={setInput} sendRequest={sendRequest} date={date} setDate={setDate} cityGuid={cityGuid} setCityGuid={setCityGuid} data={user} />
    </BaseLayout>
  );
};
