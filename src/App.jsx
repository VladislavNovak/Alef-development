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
