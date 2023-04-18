import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Typography } from '@material-ui/core';
import KenButton from '../../../../../global_components/KenButton';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import { useTranslation } from 'react-i18next';
import SaveAssignment from './SaveAssignment';

const useStyles = makeStyles(theme => ({
  headWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  assessmentTitle: {
    color: theme.palette.KenColors.primary,
    fontWeight: 600,
    fontSize: 18,
  },
  titleIcon: {
    color: theme.palette.KenColors.primary,
    marginLeft: 10,
    cursor: 'pointer',
  },
  headerIcons: {
    color: theme.palette.KenColors.primary,
    background: theme.palette.KenColors.neutral11,
    padding: 4,
    borderRadius: '50%',
    marginLeft: 10,
    cursor: 'pointer',
  },
  btnWrap: {
    marginRight: 16,
    textTransform: 'capitalize',
  },
  discardBtnWrap: {
    marginRight: 24,
  },
  upArrow: {
    border: `2px solid ${theme.palette.KenColors.kenWhite}`,
    borderRadius: '50%',
    height: 20,
    marginRight: 6,
    width: 20,
    color: theme.palette.KenColors.kenWhite,
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upArrowIcon: {
    fontSize: 16,
  },
  saveButton: {
    color: theme.palette.KenColors.kenWhite,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  discardLabel: {
    color: theme.palette.KenColors.tertiaryRed502,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  popupTitle: {
    fontSize: 12,
    color: theme.palette.KenColors.neutral400,
  },
  titleHead: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.KenColors.neutral900,
    paddingBottom: 0,
  },
  chipWrap: {
    border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
    padding: 8,
    marginTop: 24,
  },
  chipRoot: {
    borderRadius: 3,
    margin: 4,
    border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
    background: theme.palette.KenColors.kenWhite,
  },
}));

export default function AssignmentGlobalActions(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleSubmit, handleDiscard, handlePublish } = props;

  return (
    <>
      <Box className={classes.headWrap}>
        <Typography className={classes.discardBtnWrap}>
          <KenButton>
            <Typography className={classes.discardLabel} onClick={handleDiscard}>{t('labels:Discard')}</Typography>
          </KenButton>
        </Typography>
        <Typography className={classes.btnWrap}><SaveAssignment handleSubmit={handleSubmit} /> </Typography>
        <Typography>
          <KenButton variant="primary" disabled onClick={handlePublish}>
            <Typography className={classes.upArrow}>
              <ArrowUpwardOutlinedIcon className={classes.upArrowIcon} />
            </Typography>
            <Typography className={classes.saveButton}>{t('labels:Save_and_Publish')}</Typography>
          </KenButton>
        </Typography>
      </Box>
    </>
  );
}
