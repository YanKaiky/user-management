import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IPeopleData, PeopleService } from '../../shared/services/people/people.service';

export const People: FC = () => {
  const [people, setPeople] = useState<IPeopleData[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const validateCPF = (cpf: string) => {
    const value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, c, p, f, char) => `${c}.${p}.${f}-${char}`);

    return value;
  };

  const filter = people.filter((value) => {
    return value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      validateCPF(value.cpf).includes(search.toLocaleLowerCase()) ||
      new Date(value.birth_date).toLocaleDateString('pt-BR').includes(search) ||
      value.city.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await PeopleService.getAllPeople();

      setPeople(data);
      setLoading(false);
    })();
  }, [search]);

  return (
    <BaseLayout title='People List' toolbar={
      <ToolbarDetails
        showSearchField
        showNewButton
        searchText={search}
        handleSearchText={(txt) => setSearchParams({ search: txt }, { replace: true })}
      />
    }>
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Actions</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Birth Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filter.map((person) => {
              return (
                <>
                  <TableRow key={person.guid}>
                    <TableCell align='center'>
                      <IconButton>
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.last_name}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.city}</TableCell>
                    <TableCell>{validateCPF(person.cpf)}</TableCell>
                    <TableCell>{new Date(person.birth_date).toLocaleDateString('pt-BR')}</TableCell>
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
  );
};
