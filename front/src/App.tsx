import React from 'react';
import AuthenticatedRoutes from './routes/authenticatedRoutes';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';
import history from './shared/history';
import NonAuthenticatedRoutes from './routes/nonAuthenticatedRoutes';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AuthenticatedRoutes />
        <NonAuthenticatedRoutes />
      </Router>
    </Provider>
  );
};

export default App;
