import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalDelete, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { ICountryData, CountriesService } from '../../shared/services/countries/countries.service';

export const Countries: FC = () => {
  const [country, setCountry] = useState<ICountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [guid, setGuid] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const filter = country.filter((value) => {
    return value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await CountriesService.getAllCountries();

      setCountry(data);
      setLoading(false);
    })();
  }, [search]);

  const handleDelete = async (guid: string) => {
    await CountriesService.deleteCountry(guid);

    setLoading(true);
    const data = await CountriesService.getAllCountries();

    setCountry(data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <BaseLayout icon='flag' title='Countries' toolbar={
        <ToolbarDetails
          showSearchField
          showNewButton
          newButtonOnClick={() => navigate('/countries/create')}
          searchText={search}
          handleSearchText={(txt) => setSearchParams({ search: txt }, { replace: true })}
        />
      }>
        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Continent</TableCell>
                <TableCell align='center'>Edit</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filter.map((country) => {
                return (
                  <>
                    <TableRow key={country.guid}>
                      <TableCell>{country.name}</TableCell>
                      <TableCell>{country.continent}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => navigate(`/users/${country.guid}`)}>
                          <Icon color='secondary'>edit</Icon>
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            setGuid(country.guid);
                            setName(country.name);
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
        label={`Delete country ${name}?`}
        handleDelete={() => handleDelete(guid)}
      />
    </>
  );
};
