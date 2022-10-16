import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalDelete, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IUserData, UsersService } from '../../shared/services/users/users.service';

export const Users: FC = () => {
  const [user, setUser] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [guid, setGuid] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const validateCPF = (cpf: string) => {
    const value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, c, p, f, digit) => `${c}.${p}.${f}-${digit}`);

    return value;
  };

  const filter = user.filter((value) => {
    return value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      validateCPF(value.cpf).includes(search.toLocaleLowerCase()) ||
      new Date(value.birth_date).toLocaleDateString('pt-BR').includes(search) ||
      value.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.state.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.country.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await UsersService.getAllUsers();

      setUser(data);
      setLoading(false);
    })();
  }, [search]);

  const handleDelete = async (guid: string) => {
    await UsersService.deleteUser(guid);

    setLoading(true);
    const data = await UsersService.getAllUsers();

    setUser(data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <BaseLayout icon='people' title='Users' toolbar={
        <ToolbarDetails
          showSearchField
          showNewButton
          newButtonOnClick={() => navigate('/users/create')}
          searchText={search}
          handleSearchText={(txt) => setSearchParams({ search: txt }, { replace: true })}
        />
      }>
        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell align='center'>Edit</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filter.map((person) => {
                return (
                  <>
                    <TableRow key={person.guid}>
                      <TableCell title={person.name}>{person.name}</TableCell>
                      <TableCell title={person.last_name}>{person.last_name}</TableCell>
                      <TableCell title={person.email}>{person.email}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }} title={validateCPF(person.cpf)}>{validateCPF(person.cpf)}</TableCell>
                      <TableCell title={new Date(person.birth_date).toLocaleDateString('pt-BR')}>{new Date(person.birth_date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell title={person.city}>{person.city}</TableCell>
                      <TableCell title={person.state}>{person.state}</TableCell>
                      <TableCell title={person.country}>{person.country}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => navigate(`/users/${person.guid}`)}>
                          <Icon color='secondary'>edit</Icon>
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            setGuid(person.guid);
                            setName(person.name);
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
        label={`Delete user ${name}?`}
        handleDelete={() => handleDelete(guid)}
      />
    </>
  );
};
