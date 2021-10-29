Использует **React**, **Redux**.

Реализует функционал приложения, где пользователь может заполнить информацию о себе и своих детях.

Статус: стадия разработки. 

-----

- [Маршрутизация](#Маршрутизация)
- [useContext](#useContext)
- [Структура](#Структура)

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

# useContext

Нам нужно, чтобы при каких-либо изменениях в Home (форма редактирования), результат также отражался и в Preview. Для этого создадим хранилище, а доступ к нему реализуем через хук useContext.

1. **Создаем экшены**:

Перечисляем действия, которые будут воздействовать на стейт (возможно, изменятся). Пока это добавление/удаление данных для очередного ребенка:

*src/context/user/userActions.js*

    export const ADD_CHILD = 'ADD_CHILD';
    export const REMOVE_CHILD = 'REMOVE_CHILD';

2. **Создаем редьюсер**:

Отправляя действия в редьюсер, мы можем воздействовать на стейт определенным образом. Существует несколько паттернов создания редьюсера. В данном случае воспользуемся литералами объекта:

*src/context/user/userReducer.js*

    import {ADD_CHILD, REMOVE_CHILD} from "./userActions";

    const handlers = {
      [ADD_CHILD]: (state, {payload}) => ({
        ...state, children: [...state, payload]
      }),
      [REMOVE_CHILD]: (state, {payload}) => ({
        ...state, children: state.children.filter(child => child.id !== payload)
      }),
      DEFAULT: state => state,
    };

    export const userReducer = (state, action) => {
      const handle = handlers[action.type] || handlers.DEFAULT;
      return handle(state, action);
    };

3. **Извлекаем контекст**:

Именно этот инструмент предоставляет различным компонентам доступ к стейту user:

*src/context/user/userContext.js*

    import {createContext} from "react";

    export const UserContext = createContext();

4. **Соединяем стейт и редьюсер**:

Создаем компонент, который содержит 
- стейт 
- метод dispatch, который воздействует на стейт
- набор функции, которые оборачивают dispatch и производят необходимые действия

Данный компонент будет оборачивать все приложение. А в пропсы провайдера передаем и сам стейт и функции взаимодействия {add, remove, user: state}:

*src/context/user/UserState.js*

    import React, {useReducer} from 'react';
    import {ADD_CHILD, REMOVE_CHILD} from './userActions';
    import {UserContext} from "./userContext";
    import {userFields} from "./userFields";
    import {userReducer} from './userReducer';

    const initialState = {
      userFields,
      children: [],
    };

    export const UserState = ({children}) => {
      const [state, dispatch] = useReducer(userReducer, initialState);

      const add = (payload) => {
        dispatch({
          type: ADD_CHILD,
          payload,
        });
      };

      const remove = (id) => {
        dispatch({
          type: REMOVE_CHILD,
          payload: id,
        });
      };

      return (
        <UserContext.Provider value={{add, remove, user: state}} >
          {children}
        </UserContext.Provider>
      );
    };

5. **Оборачиваем все компоненты в UserState**. 

Тем самым абсолютно любые компоненты имеют доступ к стейту Alert при использовании его контекста {add, remove, user: state}.

*src/App.js*

    import React from 'react';
    import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
    import {Bottom, Navbar} from './components';
    import {UserState} from './context/user/UserState';
    import {HOME_ROUTE} from './routes/constants';
    import {publicRoutes} from './routes/routes';

    function App() {
      return (
        <UserState>
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
        </UserState>
      );
    }

    export default App;

6. **Использование контекста в компонентах**.

Все, что нужно теперь для извлечения стейта, это использовать по типу

    const {add, remove, user: state} = useContext(UserContext)

*src/pages/Home.jsx*

    import React, {useContext} from 'react';
    import {UserContext} from '../../context/user/userContext';

    const Home = () => {
      const user = useContext(UserContext);

      console.log(`user in Home: `, user);

      return (
        <div>
          Домашняя страница
        </div>
      );
    };

    export default Home;

# Структура

