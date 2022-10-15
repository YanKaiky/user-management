/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails, UpdateContinentForm } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ContinentsService } from '../../shared/services/continents/continents.service';


interface IFormData {
  guid: string;
  name: string;
}

interface ITargetProps {
  target: {
    name: string | number,
    value: string | number
  }
}

export const UpdateContinent: FC = () => {
  const { guid } = useParams();

  const [continent, setContinent] = useState<IFormData | any>();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        const data = await ContinentsService.getContinentByGuid(guid);

        setContinent(data);
        setLoading(false);
      }
    })();
  }, []);

  const setInput = (event: ITargetProps) => {
    const { name, value } = event.target;

    const newContinent = {
      ...continent,
      [name]: value,
    };

    setContinent(newContinent);
  };

  const sendRequest = async () => {
    await ContinentsService.updateContinent(continent.guid, continent);

    navigate('/continents');
  };

  return (
    <BaseLayout
      icon='public_outlined'
      title={loading ? 'Update Continent' : `Update ${continent?.name}`}
      toolbar={
        <ToolbarDetails
          showBackButton
          showSaveButton
          backButtonOnClick={() => navigate('/continents')}
          saveButtonOnClick={() => sendRequest()}
        />
      }
    >
      {loading ? (<LinearProgress variant='indeterminate' />) :
        <UpdateContinentForm setInput={setInput} sendRequest={sendRequest} data={continent} />
      }
    </BaseLayout>
  );
};
