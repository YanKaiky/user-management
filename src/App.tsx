import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Login, Menu } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Menu>
                <AppRoutes />
              </Menu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
