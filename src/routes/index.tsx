import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();
  
  return (
    <Routes>
      <Route path="/" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Toggle</Button>} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;