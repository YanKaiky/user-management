/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdateCountryForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IContinentData } from '../../shared/services/continents/continents.service';
import { CountriesService } from '../../shared/services/countries/countries.service';

interface IFormData {
  name: string;
  continent_guid: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const UpdateCountry: FC = () => {
  const { guid } = useParams();
  const [country, setCountry] = useState<IFormData | any>();
  const [continentGuid, setCotinentGuid] = useState<IContinentData | any>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await CountriesService.getCountryByGuid(guid);

        setCountry(data);
        setLoading(false);
      }
    })();
  }, []);

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newCountry = {
      ...country,
      [name]: value,
    };

    setCountry(newCountry);
  };

  const sendRequest = async () => {
    const countryReq = {
      ...country,
      continent_guid: continentGuid,
    };

    await CountriesService.updateCountry(country.guid, countryReq);

    navigate('/countries');
  };

  return (
    <BaseLayout
      icon='flag'
      title={loading ? 'Update Country' : `Update ${country?.name}`}
      toolbar={
        <ToolbarDetails
          showBackButton
          showSaveButton
          backButtonOnClick={() => navigate('/countries')}
          saveButtonOnClick={() => sendRequest()}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdateCountryForm setInput={setInput} sendRequest={sendRequest} continentGuid={continentGuid} setContinentGuid={setCotinentGuid} data={country} />
      }
    </BaseLayout>
  );
};
