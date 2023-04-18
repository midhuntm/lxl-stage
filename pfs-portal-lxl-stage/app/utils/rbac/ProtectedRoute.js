import { Slide } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Redirect } from 'react-router-dom';
import KenLoader from '../../components/KenLoader';
import { authorizer } from './config';

const ProtectedRoute = ({
  component: Component,
  path,
  exact,
  strict,
  redirectTo = '/home',
  feature,
  action,
  ...rest
}) => {
  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState('loading');

  useEffect(() => {
    /* Update effect logic to track correct state */
    authorizer
      .can(feature, action)
      .then(isAllowed => {
        setState(isAllowed ? 'allowed' : 'redirect');
      })
      .catch(error => {
        console.error(
          'ProtectedComponent: Error authorizing: ',
          feature,
          action,
          error
        );
      });
  }, []);

  return (
    <Route
      exact={exact}
      strict={strict}
      path={path}
      render={props => {
        if (state === 'allowed') {
          return <Component {...props} {...rest} />;
        } else if (state === 'loading') {
          <KenLoader />;
        } else <RedirectComp to={redirectTo} />;
      }}
    />
  );
};

const RedirectComp = to => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  React.useEffect(() => {
    enqueueSnackbar(t('messages:Protected_Route_Error'), {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      variant: 'error',
      TransitionComponent: Slide,
    });
  }, []);

  return <Redirect to={to} />;
};

export default ProtectedRoute;
