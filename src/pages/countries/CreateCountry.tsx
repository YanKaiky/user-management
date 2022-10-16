/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateCountryForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CountriesService, ICountryData } from '../../shared/services/countries/countries.service';

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

export const CreateCountry: FC = () => {
  const data = {
    name: '',
    continent_guid: '',
  };

  const [country, setCountry] = useState<IFormData>(data);
  const [continentGuid, setContinentGuid] = useState<ICountryData | any>();

  const navigate = useNavigate();

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

    await CountriesService.createCountry(countryReq);

    navigate('/countries');
  };

  return (
    <BaseLayout
      icon='flag'
      title='Create Country'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/countries')}
        />
      }
    >
      <CreateCountryForm setInput={setInput} sendRequest={sendRequest} continentGuid={continentGuid} setContinentGuid={setContinentGuid} data={country} />
    </BaseLayout>
  );
};
