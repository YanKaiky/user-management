/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdatePeopleForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ICityData } from '../../shared/services/cities/cities.service';
import { PeopleService } from '../../shared/services/people/people.service';

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

export const UpdatePeople: FC = () => {
  const { guid } = useParams();
  const [people, setPeople] = useState<IFormData | any>();
  const [cityGuid, setCityGuid] = useState<ICityData | any>();
  const [date, setDate] = useState<Dayjs | any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await PeopleService.getPeopleByGuid(guid);

        setPeople(data);
        setLoading(false);
      }
    })();
  }, []);

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
      birth_date: date ?? date ?? people.birth_date,
      city_guid: cityGuid ?? cityGuid ?? people.city_guid,
    };

    await PeopleService.updatePeople(people.guid, peopleReq);

    navigate('/people');
  };

  return (
    <BaseLayout
      icon='people'
      title={loading ? 'Update People' : `Update ${people?.name}`}
      toolbar={
        <ToolbarDetails
          showBackButton
          showSaveButton
          backButtonOnClick={() => navigate('/people')}
          saveButtonOnClick={() => sendRequest()}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdatePeopleForm setInput={setInput} sendRequest={sendRequest} date={date} setDate={setDate} cityGuid={cityGuid} setCityGuid={setCityGuid} data={people} />
      }
    </BaseLayout>
  );
};
