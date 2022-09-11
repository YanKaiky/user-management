import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalDelete, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService, ICityData } from '../../shared/services/cities/cities.service';

export const Cities: FC = () => {
  const [cities, setCities] = useState<ICityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [guid, setGuid] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const filter = cities.filter((value) => {
    return value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.uf.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await CitiesService.getAllCities();

      setCities(data);
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (guid: string) => {
    await CitiesService.deleteCity(guid);

    setLoading(true);
    const data = await CitiesService.getAllCities();

    setCities(data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <BaseLayout icon='location_city' title='Cities' toolbar={
        <ToolbarDetails
          showSearchField
          showNewButton
          newButtonOnClick={() => navigate('/cities/create')}
          searchText={search}
          handleSearchText={(txt) => setSearchParams({ search: txt }, { replace: true })}
        />
      }>
        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>UF</TableCell>
                <TableCell align='center'>Edit</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filter.map((city) => {
                return (
                  <>
                    <TableRow key={city.guid}>
                      <TableCell>{city.name}</TableCell>
                      <TableCell>{city.uf}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => navigate(`/cities/${city.guid}`)}>
                          <Icon color='secondary'>edit</Icon>
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            setGuid(city.guid);
                            setName(city.name);
                            setOpen(true);
                          }}
                        >
                          <Icon color='error'>delete</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>

            {!filter.length && !loading && (<caption>No record found</caption>)}

            <TableFooter>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <LinearProgress variant='indeterminate' />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </BaseLayout>

      <ModalDelete
        open={open}
        onClose={() => setOpen(false)}
        label={`Delete city ${name}?`}
        handleDelete={() => handleDelete(guid)}
      />
    </>
  );
};
