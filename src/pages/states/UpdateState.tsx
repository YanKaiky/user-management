/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdateStateForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ICountryData } from '../../shared/services/countries/countries.service';
import { StatesService } from '../../shared/services/states/states.service';

interface IFormData {
  guid: string;
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

export const UpdateState: FC = () => {
  const { guid } = useParams();
  const [state, setState] = useState<IFormData | any>();
  const [countryGuid, setCountryGuid] = useState<ICountryData | any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await StatesService.getStateByGuid(guid);

        setState(data);
        setLoading(false);
      }
    })();
  }, []);

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

    await StatesService.updateState(state?.guid, stateReq);

    navigate('/states');
  };

  return (
    <BaseLayout
      icon='travel_explore_rounded'
      title={loading ? 'Update State' : `Update ${state?.name}`}
      toolbar={
        <ToolbarDetails
          showBackButton
          showSaveButton
          backButtonOnClick={() => navigate('/states')}
          saveButtonOnClick={() => sendRequest()}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdateStateForm setInput={setInput} sendRequest={sendRequest} countryGuid={countryGuid} setCountryGuid={setCountryGuid} data={state} />
      }
    </BaseLayout>
  );
};
