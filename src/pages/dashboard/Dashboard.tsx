import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { DashboardService, IContinentsValuesData, IDashboardData } from '../../shared/services/dashboard/dashboard.service';
import world from '../../img/continents.png';

export const Dashboard: FC = () => {
  const [dashboard, setDashboard] = useState<IDashboardData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataDashboard = await DashboardService.getValues();

      setDashboard(dataDashboard);
      setLoading(false);
    })();
  }, []);

  return (
    <BaseLayout icon='dashboard_outlined' title='Dashboard' toolbar={<ToolbarDetails showNewButton={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={36} sm={36} md={14} lg={12} xl={1.5}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total Continents</Typography>

                  <Box padding={6} display='flex' justifyContent='space-between' alignItems='center'>
                    {loading ? (
                      <CircularProgress />
                    ) :
                      <>
                        <Box display='flex' flexDirection='column'>
                          {
                            dashboard?.continents.values.map((c: IContinentsValuesData) => {
                              return (
                                <Typography key={c.guid}>{c.name}</Typography>
                              );
                            })
                          }
                        </Box>

                        <Typography variant='h1'>{dashboard?.continents.length}</Typography>
                      </>
                    }

                    <Box>
                      <img src={world} width='20vw' height='25vh' />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total Countries</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {loading ? (
                      <CircularProgress />
                    ) :
                      <Typography variant='h1'>{dashboard?.countries}</Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total States</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {loading ? (
                      <CircularProgress />
                    ) :
                      <Typography variant='h1'>{dashboard?.states}</Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total Cities</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {loading ? (
                      <CircularProgress />
                    ) :
                      <Typography variant='h1'>{dashboard?.cities}</Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total Users</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {loading ? (
                      <CircularProgress />
                    ) :
                      <Typography variant='h1'>{dashboard?.users}</Typography>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout >
  );
};
