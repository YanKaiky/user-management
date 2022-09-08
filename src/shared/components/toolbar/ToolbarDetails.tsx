import { Box, Button, Icon, Paper, Skeleton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';

interface IToolbarDetailsProps {
  searchText?: string,
  showSearchField?: boolean,
  newFind?: string,
  showNewButton?: boolean,
  showBackButton?: boolean,
  showSaveButton?: boolean,
  showSaveAndBackButton?: boolean,

  loadingNewButton?: boolean,
  loadingBackButton?: boolean,
  loadingSaveButton?: boolean,
  loadingSaveAndBackButton?: boolean,

  handleSearchText?: (newText: string) => void;
  newButtonOnClick?: () => void;
  backButtonOnClick?: () => void;
  saveButtonOnClick?: () => void;
  saveAndBackButtonOnClick?: () => void;
}

export const ToolbarDetails: FC<IToolbarDetailsProps> = ({
  searchText = '',
  showSearchField = false,
  newFind = 'New',
  showNewButton = false,
  showBackButton = false,
  showSaveButton = false,
  showSaveAndBackButton = false,

  loadingNewButton = false,
  loadingBackButton = false,
  loadingSaveButton = false,
  loadingSaveAndBackButton = false,

  handleSearchText,
  newButtonOnClick,
  backButtonOnClick,
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
      justifyContent='space-between'
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSearchField && (
        <TextField
          size='small'
          value={searchText}
          placeholder='Search...'
          onChange={(e) => handleSearchText?.(e.target.value)}
        />
      )}

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
