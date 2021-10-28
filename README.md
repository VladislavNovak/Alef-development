Использует **React**, **Redux**.

Реализует функционал приложения, где пользователь может заполнить информацию о себе и своих детях.

Статус: стадия разработки. 

-----

![Screenshot]()

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
    import {AddTask, Tasks} from '../pages';

    export const publicRoutes = [
      {title: `Add Task`, path: HOME_ROUTE, Component: AddTask},
      {title: `Task List`, path: PREVIEW_ROUTE, Component: Tasks},
    ];

4. **Создаем компонент отвечающий за навигацию:**
