import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import chatPage from '../pages/chatPage';
import chatSelectionPage from '../pages/chatSelectionPage';
import Header from '../shared/components/Header';
import history from '../shared/history';
import { useRequestTokenValidation } from '../store/hooks/loginHooks';
import { useGetUser, useUser } from '../store/hooks/userHooks';
import { getSessionParam } from '../utils';
import { sendError, sendInfo } from '../utils/notify';

const AuthenticatedRoutes = (): JSX.Element => {
  const requestTokenValidation = useRequestTokenValidation();
  const getUser = useGetUser();
  const user = useUser();
  const handleCheckSession = useCallback(async () => {
    const token = getSessionParam('token');
    if (!token) {
      history.push('/login');
      sendInfo('Sessão inválida, por favor realiza o login!');
    } else {
      try {
        await requestTokenValidation(token);
      } catch (error) {
        if (error instanceof Error) {
          sendInfo('Sessão expirada, por favor realize o login novamente!');
          history.push('/login');
        }
      }
    }
  }, []);

  const handleGetUserData = useCallback(async () => {
    try {
      await getUser();
    } catch {
      sendError('Falha ao buscar dados da sessão, por favor realize o login novamente!');
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    handleCheckSession();
    handleGetUserData();
  }, [handleCheckSession, handleGetUserData, history]);
  return (
    <>
      <Header user={user} />
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
