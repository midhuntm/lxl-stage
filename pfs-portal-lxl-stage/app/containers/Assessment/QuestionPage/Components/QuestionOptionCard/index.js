import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import KenIcon from '../../../../../global_components/KenIcon';

const useStyles = makeStyles(theme => ({
  questionBankBtn: {
    background: theme.palette.KenColors.kenWhite,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
    cursor: 'pointer',
  },
  icon: {
    padding: 8,
    textAlign: 'center',
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnName: {
    marginLeft: 8,
    color: theme.palette.KenColors.neutral900,
    fontWeight: 600,
    fontSize: 14,
  },
}));

export default function AddQuestionOptionCard(props) {
  const classes = useStyles();

  const { icon, label, iconColor, bgColor, handleOnClick } = props;

  return (
    <Box
      className={classes.questionBankBtn}
      data-testid="addQuestion - optionCard"
      onClick={handleOnClick}
    >
      <Typography
        item
        className={classes.icon}
        style={{ backgroundColor: bgColor }}
      >
        <KenIcon icon={icon} styles={{ color: iconColor }} variant="medium" />
      </Typography>
      <Typography item className={classes.btnName}>
        {label}
      </Typography>
    </Box>
  );
}
