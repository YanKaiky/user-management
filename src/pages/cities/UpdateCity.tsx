/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdateCityForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/cities/cities.service';

interface IFormData {
  guid: string;
  name: string;
  uf: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const UpdateCity: FC = () => {
  const { guid } = useParams();
  const [city, setCity] = useState<IFormData | any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await CitiesService.getCityByGuid(guid);

        setCity(data);
        setLoading(false);
      }
    })();
  }, []);

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newCity = {
      ...city,
      [name]: value,
    };

    setCity(newCity);
  };

  const sendRequest = async () => {
    await CitiesService.updateCity(city.guid, city);

    navigate('/cities');
  };

  return (
    <BaseLayout
      icon='location_city'
      title={loading ? 'Update City' : `Update ${city?.name}`}
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/cities')}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdateCityForm setInput={setInput} sendRequest={sendRequest} data={city} />
      }
    </BaseLayout>
  );
};
