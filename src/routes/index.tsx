import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { People, CreatePeople, UpdatePeople, Cities, Dashboard, UpdateCity, CreateCity } from '../pages';
import { useDrawerContext } from '../shared/contexts';
import DrawerRoutes from './DrawerRoutes/DrawerRoutes';

const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions(DrawerRoutes);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/people" element={<People />} />
      <Route path="/people/create" element={<CreatePeople />} />
      <Route path="/people/:guid" element={<UpdatePeople />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/cities/create" element={<CreateCity />} />
      <Route path="/cities/:guid" element={<UpdateCity />} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
