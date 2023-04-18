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
      opacity: '0.95',
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
    backgroundColor: theme.palette.KenColors.kenBlack,
    opacity: '0.95',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
    width: '65%',
    fontWeight: 600,
    fontSize: 38,
    textAlign: 'center',
    color: theme.palette.KenColors.kenWhite,
  },
}));

export default function ComingSoonFullScreen(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    config: {
      comingSoon: {
        entryFullScreenEnabled = false,
        entryFullScreenText = t('Coming_soon'),
      } = {},
    },
  } = useContext(configContext);

  return (
    <div>
      {entryFullScreenEnabled ? (
        <Grid className={classes.container}>
          <Typography className={classes.comingSoonLabel}>
            <Typography className={classes.innerContent}>
              {entryFullScreenText}
            </Typography>
          </Typography>
        </Grid>
      ) : null}
    </div>
  );
}
