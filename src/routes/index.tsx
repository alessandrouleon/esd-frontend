// import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
// import Cookies from 'universal-cookie';
import {DefaultLayout} from '../layouts/DefaultLayout';
import {NotFound} from '../pages/NotFound';
// import {useToken} from '../shared/hooks/auth';

import {APP_PAGES} from './pages.routes';
import { Login } from '../pages/Login';

export function AppRoutes() {
  // const {permission} = useToken();

  return (
    <Routes>
      {/* {permission !== true ? ( */}
      <Route path="/" element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          {APP_PAGES.map(({route, component}) => (
            <Route key={route} path={route} element={component} />
          ))}
        </Route>
      {/* ) : ( */}
         {/* <Route path="" element={<Unauthorized />} /> */}
        <Route path="" element={<NotFound />} />
      {/* )} */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
