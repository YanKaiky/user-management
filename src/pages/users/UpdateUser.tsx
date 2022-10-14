/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdateUserForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ICityData } from '../../shared/services/cities/cities.service';
import { UsersService } from '../../shared/services/users/users.service';

interface IFormData {
  guid: string;
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

export const UpdateUser: FC = () => {
  const { guid } = useParams();
  const [user, setUser] = useState<IFormData | any>();
  const [cityGuid, setCityGuid] = useState<ICityData | any>();
  const [date, setDate] = useState<Dayjs | any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await UsersService.getUserByGuid(guid);

        setUser(data);
        setLoading(false);
      }
    })();
  }, []);

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
      birth_date: date ?? date ?? user.birth_date,
      city_guid: cityGuid ?? cityGuid ?? user.city_guid,
    };

    await UsersService.updateUser(user.guid, userReq);

    navigate('/users');
  };

  return (
    <BaseLayout
      icon='people'
      title={loading ? 'Update User' : `Update ${user?.name}`}
      toolbar={
        <ToolbarDetails
          showBackButton
          showSaveButton
          backButtonOnClick={() => navigate('/users')}
          saveButtonOnClick={() => sendRequest()}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdateUserForm setInput={setInput} sendRequest={sendRequest} date={date} setDate={setDate} cityGuid={cityGuid} setCityGuid={setCityGuid} data={user} />
      }
    </BaseLayout>
  );
};
