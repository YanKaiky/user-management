import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService, ICityData } from '../../shared/services/cities/cities.service';
import { IPeopleData, PeopleService } from '../../shared/services/people/people.service';

export const Dashboard: FC = () => {
  const [cities, setCities] = useState<ICityData[]>([]);
  const [people, setPeople] = useState<IPeopleData[]>([]);

  useEffect(() => {
    (async () => {
      const dataPeople = await PeopleService.getAllPeople();
      const dataCities = await CitiesService.getAllCities();

      setPeople(dataPeople);
      setCities(dataCities);
    })();
  }, []);

  return (
    <BaseLayout icon='home' title='Home Page' toolbar={<ToolbarDetails showNewButton={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de Pessoas</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>{people.length}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de UF&lsquo;s</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>20</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de Cidades</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>{cities.length}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};
