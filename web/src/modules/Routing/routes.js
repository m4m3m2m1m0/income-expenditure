import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  REGISTER_ROUTE,
} from '../../shared/const/routes.const';

const routes = [
  {
    path: LOGIN_ROUTE,
    exact: true,
    name: 'login-page',
    type: 'public',
    loader: () => import('../Login/login-page.component'),
  },
  {
    path: REGISTER_ROUTE,
    exact: true,
    name: 'register-page',
    type: 'public',
    loader: () => import('../Register/register-page.component'),
  },
  {
    path: HOME_ROUTE,
    exact: true,
    name: 'home-page',
    type: 'authed',
    loader: () => import('../Home/home-page.component'),
  },
];

export default routes;
