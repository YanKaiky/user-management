import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { People, UpsertPeople, Cities, Dashboard } from '../pages';
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
      <Route path="/people/create" element={<UpsertPeople />} />
      <Route path="/people/:guid" element={<UpsertPeople />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
