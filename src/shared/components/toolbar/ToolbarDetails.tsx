import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';
import { FC } from 'react';

// interface IToolbarDetailsProps {
//   name?: string,
// }

export const ToolbarDetails: FC/* <IToolbarDetailsProps> */ = () => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      <Button
        variant='contained'
        color='primary'
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Save
      </Button>
      
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Save & back
      </Button>
      
      <Button
        variant='contained'
        color='error'
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >
        Delete
      </Button>
      
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        startIcon={<Icon>add</Icon>}
      >
        New
      </Button>
      
      <Divider variant='middle' orientation='vertical' />
      
      <Button
        variant='outlined'
        color='primary'
        disableElevation
        startIcon={<Icon>arrow_back_ios</Icon>}
      >
        Back
      </Button>
    </Box>
  );
};
