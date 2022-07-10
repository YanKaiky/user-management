import { FC, ReactNode } from 'react';
import { Avatar, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../../contexts';
import ListItemMenu from './ListItemMenu/ListItemMenu';

interface IMenuProps {
  children: ReactNode;
}

export const Menu: FC<IMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width="100%" height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src='https://www.github.com/YanKaiky.png' />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemMenu key={drawerOption.path} icon={drawerOption.icon} label={drawerOption.label} to={drawerOption.path} onClick={smDown ? toggleDrawerOpen : undefined} />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
