import {HOME_ROUTE, PREVIEW_ROUTE} from './constants';
import {Home, Preview} from '../pages';

export const publicRoutes = [
  {title: `Form`, path: HOME_ROUTE, Component: Home},
  {title: `Preview`, path: PREVIEW_ROUTE, Component: Preview},
];
