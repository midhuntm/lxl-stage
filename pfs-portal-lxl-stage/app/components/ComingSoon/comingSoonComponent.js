import React, { useContext } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import configContext from '../../utils/helpers/configHelper';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  container: {
    // position: "relative",
    // height: "100%",
    '&::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 10,
      backgroundColor: 'rgba(103, 128, 159, 0.2)',
    },
  },
  comingSoonLabel: {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(103, 128, 159, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
    fontSize: 18,
  },
}));

export default function ComingSoonComponent(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    config: {
      comingSoon: {
        onComponentEnabled = true,
        onComponentText = t('Coming_soon'),
      } = {},
    },
  } = useContext(configContext);

  return (
    <div>
      {onComponentEnabled && (
        <Grid className={classes.container}>
          <Typography className={classes.comingSoonLabel}>
            {onComponentText}
          </Typography>
        </Grid>
      )}
    </div>
  );
}
