import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';
import { FC } from 'react';

interface IToolbarDetailsProps {
  newFind?: string,
  showNewButton?: boolean,
  showBackButton?: boolean,
  showDeleteButton?: boolean,
  showSaveButton?: boolean,
  showSaveAndBackButton?: boolean,

  loadingNewButton?: boolean,
  loadingBackButton?: boolean,
  loadingDeleteButton?: boolean,
  loadingSaveButton?: boolean,
  loadingSaveAndBackButton?: boolean,
  
  newButtonOnClick?: () => void;
  backButtonOnClick?: () => void;
  deleteButtonOnClick?: () => void;
  saveButtonOnClick?: () => void;
  saveAndBackButtonOnClick?: () => void;
}

export const ToolbarDetails: FC<IToolbarDetailsProps> = ({
  newFind = 'New',
  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  loadingNewButton = false,
  loadingBackButton = false,
  loadingDeleteButton = false,
  loadingSaveButton = false,
  loadingSaveAndBackButton = false,
  
  newButtonOnClick,
  backButtonOnClick,
  deleteButtonOnClick,
  saveButtonOnClick,
  saveAndBackButtonOnClick
}) => {
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
      {(showSaveButton && !loadingSaveButton) && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={saveButtonOnClick}
          startIcon={<Icon>save</Icon>}
        >
          Save
        </Button>
      )}

      {loadingSaveButton && (<Skeleton width={110} height={60} />)}

      {(showSaveAndBackButton && !loadingSaveAndBackButton) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={saveAndBackButtonOnClick}
          startIcon={<Icon>save</Icon>}
        >
          Save & back
        </Button>
      )}

      {loadingSaveAndBackButton && (<Skeleton width={146} height={60} />)}

      {(showDeleteButton && !loadingDeleteButton) && (
        <Button
          variant='contained'
          color='error'
          disableElevation
          onClick={deleteButtonOnClick}
          startIcon={<Icon>delete</Icon>}
        >
          Delete
        </Button>
      )}

      {loadingDeleteButton && (<Skeleton width={107} height={60} />)}

      {(showNewButton && !loadingNewButton) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={newButtonOnClick}
          startIcon={<Icon>add</Icon>}
        >
          {newFind}
        </Button>
      )}

      {loadingNewButton && (<Skeleton width={87} height={60} />)}

      <Divider variant='middle' orientation='vertical' />

      {(showBackButton && !loadingBackButton) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={backButtonOnClick}
          startIcon={<Icon>arrow_back_ios</Icon>}
        >
          Back
        </Button>
      )}

      {loadingBackButton && (<Skeleton width={93} height={60} />)}
    </Box>
  );
};
