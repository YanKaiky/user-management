/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCityForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/cities/cities.service';
import { IStateData } from '../../shared/services/states/states.service';

interface IFormData {
  name: string;
  state_guid: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const CreateCity: FC = () => {
  const data = {
    name: '',
    state_guid: '',
  };

  const [city, setCity] = useState<IFormData>(data);
  const [stateGuid, setStateGuid] = useState<IStateData | any>();

  const navigate = useNavigate();

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newCity = {
      ...city,
      [name]: value,
    };

    setCity(newCity);
  };

  const sendRequest = async () => {
    const cityReq = {
      ...city,
      state_guid: stateGuid,
    };

    await CitiesService.createCity(cityReq);

    navigate('/cities');
  };

  return (
    <BaseLayout
      icon='location_city'
      title='Create City'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/cities')}
        />
      }
    >
      <CreateCityForm setInput={setInput} sendRequest={sendRequest} stateGuid={stateGuid} setStateGuid={setStateGuid} data={city} />
    </BaseLayout>
  );
};
