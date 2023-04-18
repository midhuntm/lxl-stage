import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Typography } from '@material-ui/core';
import KenButton from '../../../../../global_components/KenButton';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import { useTranslation } from 'react-i18next';
import SaveAssessment from './SaveAssessment';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

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
    // textTransform: 'capitalize',
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
  btn: {
    marginLeft: '8px',
  },
}));
export default function AssessmentGlobalActions(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    handleSubmit,
    handleDiscard,
    handlePublish,
    disablePublishAction = true,
    disablePreviewAction = true,
    publishStatus,
    origin,
    handleGoAssessment,
    handleGoHome,
    handleGoPreview,
  } = props;

  return (
    <>
      <Box className={classes.headWrap}>
        {/* <Typography className={classes.discardBtnWrap}>
          <KenButton>
            <Typography
              className={classes.discardLabel}
              onClick={handleDiscard}
            >
              {t('labels:Discard')}
            </Typography>
          </KenButton>
        </Typography>
        <Typography className={classes.btnWrap}>
          <SaveAssessment handleSubmit={handleSubmit} />
        </Typography> */}
        <Typography>
          <KenButton
            buttonClass={classes.btn}
            onClick={handleGoAssessment}
            variant="outlined"
            color="primary"
          >
            Create another assessment
          </KenButton>
          <KenButton
            buttonClass={classes.btn}
            onClick={handleGoHome}
            color="primary"
            autoFocus
            variant="contained"
          >
            Go {` to ${origin}`}
          </KenButton>
          <KenButton
            disabled={disablePreviewAction}
            buttonClass={classes.btn}
            onClick={handleGoPreview}
            variant="primary"
            startIcon={<VisibilityOutlinedIcon style={{ color: '#fff' }} />}
          >
            <Typography className={classes.saveButton}>Preview</Typography>
          </KenButton>
          <KenButton
            variant="primary"
            buttonClass={classes.btn}
            disabled={disablePublishAction}
            onClick={publishStatus !== 'published' && handlePublish}
            startIcon={
              publishStatus === 'published' ? (
                <CheckCircleOutlineIcon style={{ color: '#fff' }} />
              ) : (
                ''
              )
            }
            style={{
              backgroundColor: publishStatus === 'published' ? 'green' : '',
              cursor: publishStatus === 'published' ? 'auto' : 'pointer',
            }}
          >
            {publishStatus === 'published' ? (
              <Typography className={classes.saveButton}>
                {t('labels:Published_Assessment')}
              </Typography>
            ) : (
              <>
                <Typography className={classes.upArrow}>
                  <ArrowUpwardOutlinedIcon className={classes.upArrowIcon} />
                </Typography>
                <Typography className={classes.saveButton}>
                  {t('labels:Publish_Assessment')}
                </Typography>
              </>
            )}
          </KenButton>
        </Typography>
      </Box>
    </>
  );
}
