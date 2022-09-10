import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IPeopleData, PeopleService } from '../../shared/services/people/people.service';

export const UpdatePeople: FC = () => {
  const { guid } = useParams();
  const [people, setPeople] = useState<IPeopleData>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (guid) {
        setLoading(true);

        const data = await PeopleService.getPeopleByGuid(guid);

        setPeople(data);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <BaseLayout
      icon='people'
      title={loading ? 'Update People' : guid ? `Update ${people?.name}` : 'Create People'}
      toolbar={
        <ToolbarDetails
          showSaveButton
          showBackButton
          saveButtonOnClick={() => navigate('/people')}
          backButtonOnClick={() => navigate('/people')}
        />
      }
    >
      {
        loading ? (<LinearProgress variant='indeterminate' />) :
          <>
          </>
      }
    </BaseLayout>
  );
};
