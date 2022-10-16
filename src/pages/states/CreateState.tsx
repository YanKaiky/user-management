/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateStateForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ICountryData } from '../../shared/services/countries/countries.service';
import { StatesService } from '../../shared/services/states/states.service';

interface IFormData {
  name: string;
  uf: string;
  country_guid: string;
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
    uf: '',
    country_guid: '',
  };

  const [state, setState] = useState<IFormData>(data);
  const [countryGuid, setCountryGuid] = useState<ICountryData | any>();

  const navigate = useNavigate();

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newState = {
      ...state,
      [name]: value,
    };

    setState(newState);
  };

  const sendRequest = async () => {
    const stateReq = {
      ...state,
      country_guid: countryGuid,
    };

    await StatesService.createState(stateReq);

    navigate('/states');
  };

  return (
    <BaseLayout
      icon='travel_explore_rounded'
      title='Create State'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/states')}
        />
      }
    >
      <CreateStateForm setInput={setInput} sendRequest={sendRequest} countryGuid={countryGuid} setCountryGuid={setCountryGuid} data={state} />
    </BaseLayout>
  );
};
