import React from 'react';
import { useEffect } from 'react';
import { clearSessionParams } from '../../utils';
import history from '../../shared/history';

const LogoutPage = (): JSX.Element => {
  useEffect(() => {
    clearSessionParams();
    history.push('/login');
  });

  return <></>;
};

export default LogoutPage;
