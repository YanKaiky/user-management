import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService, ICityData } from '../../shared/services/cities/cities.service';

export const Cities: FC = () => {
  const [cities, setCities] = useState<ICityData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const data = await CitiesService.getAllCities();

      setCities(data);
    })();
  }, []);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  console.log(cities);

  return (
    <BaseLayout title='Cities' toolbar={
      <ToolbarDetails
        showSearchField
        showNewButton
        searchText={search}
        handleSearchText={(txt) => setSearchParams({ search: txt }, { replace: true })}
      />
    }>
      <div>

      </div>
    </BaseLayout>
  );
};
