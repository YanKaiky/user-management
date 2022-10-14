import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Users, CreateUser, UpdateUser, Cities, Dashboard, UpdateCity, CreateCity } from '../pages';
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
      label: 'Users',
      icon: 'people',
      path: '/users'
    },
    {
      label: 'Continents',
      icon: 'public_outlined',
      path: '/continents'
    },
    {
      label: 'Countries',
      icon: 'flag',
      path: '/countries'
    },
    {
      label: 'States',
      icon: 'travel_explore_rounded',
      path: '/states'
    },
    {
      label: 'Cities',
      icon: 'where_to_vote_rounded',
      path: '/cities'
    },
  ];

  useEffect(() => {
    setDrawerOptions(DrawerRoutes);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/users" element={<Users />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/users/:guid" element={<UpdateUser />} />

      <Route path="/continents" element={<Cities />} />

      <Route path="/countries" element={<Cities />} />
      <Route path="/countries/create" element={<CreateCity />} />
      <Route path="/countries/:guid" element={<UpdateCity />} />

      <Route path="/states" element={<Cities />} />
      <Route path="/states/create" element={<CreateCity />} />
      <Route path="/states/:guid" element={<UpdateCity />} />

      <Route path="/cities" element={<Cities />} />
      <Route path="/cities/create" element={<CreateCity />} />
      <Route path="/cities/:guid" element={<UpdateCity />} />

      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
