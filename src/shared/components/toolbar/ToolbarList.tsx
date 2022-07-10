import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { FC } from 'react';

interface IToolbarListProps {
  find?: string,
  showInput?: boolean,
  onChange?: (text: string) => void,

  newFind?: string,
  newShowInput?: boolean,
  newOnClick?: () => void,
}

export const ToolbarList: FC<IToolbarListProps> = ({
  find = '',
  showInput = false,
  onChange,
  newFind = 'New',
  newShowInput = true,
  newOnClick
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
      {showInput && (
        <TextField
          size='small'
          placeholder='Search...'
          value={find}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}

      <Box display='flex' flex={1} justifyContent='end'>
        {newShowInput && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={newOnClick}
            endIcon={<Icon>add</Icon>}
          >
            {newFind}
          </Button>
        )}
      </Box>
    </Box>
  );
};
