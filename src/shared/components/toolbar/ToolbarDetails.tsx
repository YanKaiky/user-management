import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Save
          </Typography>
        </Button>
      )}

      {loadingSaveButton && (<Skeleton width={110} height={60} />)}

      {(showSaveAndBackButton && !loadingSaveAndBackButton && !smDown && !mdDown) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={saveAndBackButtonOnClick}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Save & back
          </Typography>
        </Button>
      )}

      {loadingSaveAndBackButton && !smDown && !mdDown && (<Skeleton width={146} height={60} />)}

      {(showDeleteButton && !loadingDeleteButton) && (
        <Button
          variant='contained'
          color='error'
          disableElevation
          onClick={deleteButtonOnClick}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Delete
          </Typography>
        </Button>
      )}

      {loadingDeleteButton && (<Skeleton width={107} height={60} />)}

      {(showNewButton && !loadingNewButton && !smDown) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={newButtonOnClick}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {newFind}
          </Typography>
        </Button>
      )}

      {loadingNewButton && !smDown && (<Skeleton width={87} height={60} />)}

      {!smDown && !mdDown && <Divider variant='middle' orientation='vertical' />}

      {(showBackButton && !loadingBackButton) && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={backButtonOnClick}
          startIcon={<Icon>arrow_back_ios</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Back
          </Typography>
        </Button>
      )}

      {loadingBackButton && (<Skeleton width={93} height={60} />)}
    </Box>
  );
};
