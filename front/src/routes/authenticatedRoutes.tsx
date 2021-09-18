import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import chatSelectionPage from '../pages/chatSelectionPage';

export const AuthenticatedRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={chatSelectionPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthenticatedRoutes;
