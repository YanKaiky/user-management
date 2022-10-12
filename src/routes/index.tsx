import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { People, CreatePeople, UpdatePeople, Cities, Dashboard, UpdateCity, CreateCity } from '../pages';
import { useDrawerContext } from '../shared/contexts';

const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  const DrawerRoutes = [
    {
      label: 'Dashboard',
      icon: 'dashboard_outlined',
      path: '/'
    },
    {
      label: 'People',
      icon: 'people',
      path: '/people'
    },
    {
      label: 'Cities',
      icon: 'location_city',
      path: '/cities'
    },
  ];

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
