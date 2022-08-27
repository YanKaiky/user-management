import { FC, useEffect, useState } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/people/people.service';

export const People: FC = () => {
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await PeopleService.getAllPeople();
  
      // setPeople(data);
    })();
  }, []);

  return (
    <BaseLayout title='People' toolbar={<ToolbarDetails showSaveAndBackButton showNewButton />}>
      <div>
        
      </div>
    </BaseLayout>
  );
};
