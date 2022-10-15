/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateContinentForm, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ContinentsService } from '../../shared/services/continents/continents.service';

interface IFormData {
  name: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const CreateContinent: FC = () => {
  const data = {
    name: '',
  };

  const [continent, setContinent] = useState<IFormData>(data);

  const navigate = useNavigate();

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newContinent = {
      ...continent,
      [name]: value,
    };

    setContinent(newContinent);
  };

  const sendRequest = async () => {
    await ContinentsService.createContinent(continent);

    navigate('/continents');
  };

  return (
    <BaseLayout
      icon='public_outlined'
      title='Create Continent'
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => sendRequest()}
          backButtonOnClick={() => navigate('/continents')}
        />
      }
    >
      <CreateContinentForm setInput={setInput} sendRequest={sendRequest} data={continent} />
    </BaseLayout>
  );
};
