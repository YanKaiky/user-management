import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IPeopleData, PeopleService } from '../../shared/services/people/people.service';

export const People: FC = () => {
  const [people, setPeople] = useState<IPeopleData[]>([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const data = await PeopleService.getAllPeople();

      setPeopleCount(data.length);
      setPeople(data);
      setLoading(false);
    })();
  }, [search]);

  console.log(people);
  console.log(peopleCount);
  console.log(loading);

  const validateCPF = (cpf: string) => {
    const value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, c, p, f, char) => `${c}.${p}.${f}-${char}`);

    return value;
  };

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
            {people.map((person) => {
              return (
                <>
                  <TableRow>
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
                  </TableRow></>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
