import { Box, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KenButton from '../global_components/KenButton/index';

export function ErrorFallback({ error, resetErrorBoundary }) {
  const { t } = useTranslation();
  return (
    <Box
      role="alert"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Typography style={{ marginTop: 10 }}>{t('Something_Wrong')}</Typography>
      {/* <pre>{error.message}</pre> */}
      <KenButton onClick={resetErrorBoundary}>{t('Try_Again')}</KenButton>
    </Box>
  );
}
