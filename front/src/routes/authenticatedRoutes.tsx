import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import chatPage from '../pages/chatPage';
import chatSelectionPage from '../pages/chatSelectionPage';
import Header from '../shared/components/Header';

const AuthenticatedRoutes = (): JSX.Element => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/chat/:roomId" exact component={chatPage} />
        <Route path="/" exact component={chatSelectionPage} />
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
};

export default AuthenticatedRoutes;
