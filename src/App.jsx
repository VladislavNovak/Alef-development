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
        <div className="container">
          <Navbar />
          <main>
            <Switch>
              {publicRoutes.map(({title, path, Component}) => <Route key={title} path={path} component={Component} exact />)}
              <Redirect to={HOME_ROUTE} />
            </Switch>
          </main>
          <Bottom />
        </div>
      </BrowserRouter>
    </UserState>
  );
}

export default App;
