import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Menu } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Menu>
              <AppRoutes />
            </Menu>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
