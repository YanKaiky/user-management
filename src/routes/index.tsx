import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import {
  Users,
  CreateUser,
  UpdateUser,
  Cities,
  Dashboard,
  UpdateCity,
  CreateCity,
  Continents,
  CreateContinent,
  UpdateContinent,
  Countries,
  CreateCountry,
  UpdateCountry,
  States,
  CreateState,
  UpdateState
} from '../pages';

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

      <Route path="/users" element={<Users />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="/users/:guid" element={<UpdateUser />} />

      <Route path="/continents" element={<Continents />} />
      <Route path="/continents/create" element={<CreateContinent />} />
      <Route path="/continents/:guid" element={<UpdateContinent />} />

      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/create" element={<CreateCountry />} />
      <Route path="/countries/:guid" element={<UpdateCountry />} />

      <Route path="/states" element={<States />} />
      <Route path="/states/create" element={<CreateState />} />
      <Route path="/states/:guid" element={<UpdateState />} />

      <Route path="/cities" element={<Cities />} />
      <Route path="/cities/create" element={<CreateCity />} />
      <Route path="/cities/:guid" element={<UpdateCity />} />

      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
