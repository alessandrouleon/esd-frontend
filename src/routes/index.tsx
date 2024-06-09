import {Route, Routes} from 'react-router-dom';
import {DefaultLayout} from '../layouts/defaultLayout';
import {NotFound} from '../pages/notFound';
// import {useToken} from '../shared/hooks/auth';

import {APP_PAGES} from './pages.routes';
import { Login } from '../pages/login';

export function AppRoutes() {
 //  const {permission} = useToken();

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
