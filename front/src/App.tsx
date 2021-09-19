import React from 'react';
import AuthenticatedRoutes from './routes/authenticatedRoutes';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Router, Switch } from 'react-router-dom';
import history from './shared/history';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={AuthenticatedRoutes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
