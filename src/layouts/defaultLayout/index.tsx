import {Outlet} from 'react-router-dom';
import {AppContainer} from '../../components/appContainer';

export function DefaultLayout() {
  return (
    <>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}
