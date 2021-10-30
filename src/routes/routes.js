import {HOME_ROUTE, PREVIEW_ROUTE} from './constants';
import {Home, Preview} from '../pages';

export const publicRoutes = [
  {title: `форма`, path: HOME_ROUTE, Component: Home},
  {title: `превью`, path: PREVIEW_ROUTE, Component: Preview},
];
