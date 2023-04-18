import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenCheckbox from '../../../../../../global_components/KenCheckbox';
import OptionLabel from './OptionLabel';

const useStyles = makeStyles(theme => ({
  bg: {
    backgroundColor: theme.palette.KenColors.kenWhite,
  },
}));

export default function OptionsSelection(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { reviewOptions = [], onChange, tabId } = props;

  return (
    <>
      <Box p={2} className={classes.bg}>
        <Typography className={classes.header}>
          {t('labels:Review_Options_Settings')}
        </Typography>
        <Box>
          {reviewOptions?.map((opt, index) => {
            return (
              <KenCheckbox
                name="name"
                key={index}
                label={<OptionLabel label={opt.label} color={opt.color} />}
                value={opt.checked}
                onChange={(e, newValue) => onChange(e, newValue, tabId, opt.id)}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}
