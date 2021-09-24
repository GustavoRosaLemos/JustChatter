import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from '../pages/loginPage';
import LogoutPage from '../pages/logoutPage';

const NonAuthenticatedRoutes = (): JSX.Element => (
  <>
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/logout" exact component={LogoutPage} />
    </Switch>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default NonAuthenticatedRoutes;
