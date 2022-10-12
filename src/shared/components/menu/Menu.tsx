import { FC, ReactNode } from 'react';
import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';
import ListItemMenu from './ListItemMenu/ListItemMenu';

interface IMenuProps {
  children: ReactNode;
}

export const Menu: FC<IMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { logout } = useAuthContext();
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { themeName, toggleTheme } = useAppThemeContext();

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

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {themeName === 'light' ? <Icon>dark_mode</Icon> : <Icon>brightness_4</Icon>}
                </ListItemIcon>
                <ListItemText primary='Theme' />
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
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
