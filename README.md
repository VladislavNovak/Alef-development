Использует **React**, **Redux**.

Реализует функционал приложения, где пользователь может заполнить информацию о себе и своих детях.

Статус: стадия разработки. 

-----

- [Маршрутизация](#Маршрутизация)


# Маршрутизация

1. **Создаем страницы**

В проекте будет две страницы. Создаем страницы Home и Preview.

Home - это форма заполнения

Preview - страница с сохраненными данными.

2. **Перечисляем в константах пути к ним:**

*src/routes/constants.js*

    export const HOME_ROUTE = `/home`;
    export const PREVIEW_ROUTE = `/preview`;

3. **Описываем пути в виде массива объектов:**

*src/routes/routes.js*

    import {HOME_ROUTE, PREVIEW_ROUTE} from './constants';
    import {Home, Preview} from '../pages';

    export const publicRoutes = [
      {title: `Form`, path: HOME_ROUTE, Component: Home},
      {title: `Preview`, path: PREVIEW_ROUTE, Component: Preview},
    ];

4. **Создаем компонент отвечающий за навигацию:**

Она позволит перемещаться между страницами при клике по указанному пункту. Используем NavLink. В отличии от простого Link, он позволяет воспользоваться стилизацией для выделения активной ссылки. NavLink включает в себя activeClassName (значение которого просто добавляется к стилизации) и/или activeStyle (используется в качестве встроенной стилизации, например activeStyle={{color: "green", fontWeight: "bold"}}). Стилизацию добавим позднее

*src/components/navbar/Navbar.jsx*

    import React from 'react';
    import {NavLink} from "react-router-dom";
    import {publicRoutes} from '../../routes/routes';

    const Navbar = () => {
      return (
        <ul className="navbar__list">
          {publicRoutes.map(({path, title}) => (
            <li key={path} className="navbar__item">
              <NavLink to={path}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      );
    };

    export default Navbar;

5. **Подключаем маршрутизацию:**

Switch итерируется по всем путям и в том случае, если ничего не найдено, возвращает последний маршрут. В нашем случае - Redirect. Это необходимо для того, чтобы пользователь, при неверном наборе пути, возвращался на HOME_ROUTE:

*src/App.js*

import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Bottom from './components/bottom/Bottom';
import Navbar from './components/navbar/Navbar';
import {HOME_ROUTE} from './routes/constants';
import {publicRoutes} from './routes/routes';

    function App() {
      return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                {publicRoutes.map(({title, path, Component}) => <Route key={title} path={path} component={Component} exact />)}
                <Redirect to={HOME_ROUTE} />
              </Switch>
            </div>
            <Bottom />
        </BrowserRouter>
      );
    }

    export default App;
