import React, { useContext } from 'react';
import configContext from '../../../utils/helpers/configHelper';
import {
  Typography,
  makeStyles,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ken42Logo from '../../../assets/Ken42logo.png';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import InstructionPopUp from './InstructionPopUp';

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

export default function QuizNavBar(props) {
  const { name, quizId, handleSubmit, totalmarks, total_marks } = props;
  const classes = useStyles();
  const { config } = useContext(configContext);
  const { t } = useTranslation();

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolBar}>
        <Box className={classes.toolBarContent}>
          <IconButton color="inherit" edge="start">
            <img src={config?.logo || ken42Logo} className={classes.logo} />
          </IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
            {name}
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className={classes.divider}
          />
          <Typography variant="h6" component="div" className={classes.subTitle}>
            {/* {t('lables:Total_marks')}: 10 */}
            Total Marks :{total_marks || totalmarks}
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className={classes.divider}
          />
          <Typography variant="h6" component="div" className={classes.subTitle}>
            <InstructionPopUp quizid={quizId} />
            {/* <span>{t('labels:View_Instructions')}</span> */}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              handleSubmit();
            }}
          >
            {/* {t('labels:Submit')} */}
            Submit Attempt
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
