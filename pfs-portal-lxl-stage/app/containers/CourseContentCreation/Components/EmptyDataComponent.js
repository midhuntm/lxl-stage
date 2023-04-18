import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function EmptyDataComponent() {
  const { t } = useTranslation();
  return (
    <Box style={{ width: '100%', position: 'absolute', top: '40%' }}>
      <Typography style={{ textAlign: 'center' }}>
        {t('labels:No_Data')}
      </Typography>
    </Box>
  );
}
