import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Box,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import ken42Logo from '../../../assets/Ken42logo.png';
import configContext from '../../../utils/helpers/configHelper';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(theme => ({
  appBar: {
    background: theme.palette.KenColors.headerBackground,
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  toolBarContent: {
    display: 'flex',
    flexDirectio: 'column',
  },
  logo: {
    maxHeight: 40,
    maxWidth: 40,
  },
  title: {
    color: theme.palette.KenColors.kenBlack,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  divider: {
    margin: 20,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.palette.KenColors.neutral400,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  subTitleIcon: {
    marginRight: 5,
  },
  submit: {
    textTransform: 'capitalize',
  },
}));
export default function AssessmentNavBar(props) {
  const classes = useStyles();
  const { config } = useContext(configContext);
  const { t } = useTranslation();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolBar}>
          <Box className={classes.toolBarContent}>
            <IconButton color="inherit" edge="start">
              <img
                src={config?.logo || ken42Logo}
                className={classes.logo}
              />
            </IconButton>

            <Typography variant="h6" component="div" className={classes.title}>
              {/* {t('instructions:PeriodicAssessment')} */}
              {props.name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
