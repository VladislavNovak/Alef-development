import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Alert, Bottom, Navbar} from './components';
import {AlertState} from './context/alert/AlertState';
import {UserState} from './context/user/UserState';
import {HOME_ROUTE} from './routes/constants';
import {publicRoutes} from './routes/routes';

function App() {
  return (
    <UserState>
      <AlertState>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <main>
              <Alert />
              <Switch>
                {publicRoutes.map(({title, path, Component}) => <Route key={title} path={path} component={Component} exact />)}
                <Redirect to={HOME_ROUTE} />
              </Switch>
            </main>
            <Bottom />
          </div>
        </BrowserRouter>
      </AlertState>
    </UserState>
  );
}

export default App;
