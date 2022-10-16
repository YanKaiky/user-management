import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalDelete, ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { IStateData, StatesService } from '../../shared/services/states/states.service';

export const States: FC = () => {
  const [state, setState] = useState<IStateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [guid, setGuid] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const filter = state.filter((value) => {
    return value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.uf.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      value.country.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await StatesService.getAllStates();

      setState(data);
      setLoading(false);
    })();
  }, [search]);

  const handleDelete = async (guid: string) => {
    await StatesService.deleteState(guid);

    setLoading(true);
    const data = await StatesService.getAllStates();

    setState(data);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <BaseLayout icon='travel_explore_rounded' title='States' toolbar={
        <ToolbarDetails
          showSearchField
          showNewButton
          newButtonOnClick={() => navigate('/states/create')}
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
                <TableCell>Country</TableCell>
                <TableCell align='center'>Edit</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filter.map((state) => {
                return (
                  <>
                    <TableRow key={state.guid}>
                      <TableCell>{state.name}</TableCell>
                      <TableCell>{state.uf}</TableCell>
                      <TableCell>{state.country}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => navigate(`/states/${state.guid}`)}>
                          <Icon color='secondary'>edit</Icon>
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            setGuid(state.guid);
                            setName(state.name);
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
        label={`Delete state ${name}?`}
        handleDelete={() => handleDelete(guid)}
      />
    </>
  );
};
