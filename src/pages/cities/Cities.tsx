import { FC, useEffect, useState } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/cities/cities.service';

export const Cities: FC = () => {
  const [cities, setCities] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await CitiesService.getAllCities();
  
      // setCities(data);
    })();
  }, []);

  return (
    <BaseLayout title='Cities' toolbar={<ToolbarDetails showSearchField />}>
      <div>
        
      </div>
    </BaseLayout>
  );
};
