/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { PeopleForm } from '../../shared/components/forms/PeopleForm';
import { BaseLayout } from '../../shared/layouts';
import { ICityData } from '../../shared/services/cities/cities.service';
import { IUpsertPeopleData, PeopleService } from '../../shared/services/people/people.service';

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const UpdatePeople: FC = () => {
  const { guid } = useParams();
  const [people, setPeople] = useState<IUpsertPeopleData | any>();
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
      birth_date: date,
      city_guid: cityGuid,
    };

    await PeopleService.createPeople(peopleReq);

    navigate('/people');
  };

  return (
    <BaseLayout
      icon='people'
      title={loading ? 'Update People' : `Update ${people?.name}`}
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/people')}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <PeopleForm setInput={setInput} sendRequest={sendRequest} date={date} setDate={setDate} cityGuid={cityGuid} setCityGuid={setCityGuid} data={people} />
      }
    </BaseLayout>
  );
};
