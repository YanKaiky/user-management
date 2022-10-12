import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { DashboardService, IDashboardData } from '../../shared/services/dashboard/dashboard.service';

export const Dashboard: FC = () => {
  const [dashboard, setDashboard] = useState<IDashboardData>();

  useEffect(() => {
    (async () => {
      const dataDashboard = await DashboardService.getValues();

      setDashboard(dataDashboard);
    })();
  }, []);

  return (
    <BaseLayout icon='dashboard_outlined' title='Dashboard' toolbar={<ToolbarDetails showNewButton={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total People</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>{dashboard?.people}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total UF&lsquo;s</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>{dashboard?.ufs}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total Cities</Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>{dashboard?.cities}</Typography>
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
