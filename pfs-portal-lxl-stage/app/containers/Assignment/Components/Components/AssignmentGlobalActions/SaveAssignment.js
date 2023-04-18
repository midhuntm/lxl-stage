import React from 'react';
import KenButton from '../../../../../global_components/KenButton';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import SaveAssessmentSvg from '../../../../../assets/Images/SaveAssessment.svg';
import AssessmentSavedSuccess from '../../../../../assets/Images/AssessmentSavedSuccess.svg';
import { useHistory } from 'react-router-dom';
import KenLinearProgress from '../../../../../global_components/KenLinearProgress';
import Routes from '../../../../../utils/routes.json';

const useStyles = makeStyles(theme => ({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: '8px',
    marginBottom: '8px',
  },

  imgCenter: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: '90px',
    marginBottom: '12px',
  },
  messageText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#EF4060',
    marginTop: '12px',
    marginBottom: '8px',
  },
  infoText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#505F79',
    marginTop: '8px',
    marginBottom: '8px',
  },
  loaderAlign: {
    marginTop: '24px',
    marginBottom: '32px',
    marginLeft: '32px',
    marginRight: '32px',
  },
  actionArea: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    marginTop: '8px',
    marginBottom: '32px',
  },
  successText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
    textAlign: 'center',
    color: '#1BBE75',
  },
}));

export default function SaveAssignment(props) {
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const [confirmation, setConfirmation] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const delayTime = 3500;
  const handleClickOpen = () => {
    setConfirmation(true);
  };

  const handleClose = () => {
    setConfirmation(false);
    setOpenSuccess(false);
  };
  /* action button */
  const handleGoHome = () => {
    // history.push(`/home`);
    history.push(`/${Routes.acadamicContent}`);
  };
  const handleGoAssignment = () => {
    history.push(`/assignment`);
  };
  const handleSaveProceed = async () => {
    setConfirmation(false);
    setProcessing(true);
    const result = await handleSubmit();
    if (result) {
      setProcessing(false);
      setOpenSuccess(true);
    }
  };
  const handleAck = () => {
    setTimeout(() => {
      setOpenSuccess(true);
      setProcessing(false);
    }, delayTime);
  };
  return (
    <>
      <KenButton variant="secondary" onClick={handleClickOpen}>
        {t('labels:Save_Assessment')}
      </KenButton>
      <Dialog
        open={confirmation || processing || openSuccess}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        {confirmation && confirmation ? (
          <>
            <DialogTitle className={classes.title}>
              {t('labels:Save_Assessment')}
            </DialogTitle>
            <DialogContent>
              <img src={SaveAssessmentSvg} className={classes.imgCenter} />

              <DialogContentText className={classes.messageText}>
                Please save your changes made to this assessment before going
                back.
              </DialogContentText>
              <DialogContentText className={classes.infoText}>
                Going back without saving your changes will leads to loosing all
                your changes made and will get revised to the last saved
                version.
              </DialogContentText>
            </DialogContent>

            <DialogActions className={classes.actionArea}>
              <KenButton
                onClick={handleClose}
                variant="outlined"
                color="primary"
              >
                Cancel
              </KenButton>
              <KenButton
                onClick={handleSaveProceed}
                color="primary"
                autoFocus
                variant="contained"
              >
                Save and Proceed
              </KenButton>
            </DialogActions>
          </>
        ) : processing && processing === true ? (
          <>
            <DialogTitle className={classes.title}>
              Save created assessment
            </DialogTitle>
            <DialogContent>
              <img src={SaveAssessmentSvg} className={classes.imgCenter} />
              <DialogContentText className={classes.infoText}>
                Saving assessment to courses.
              </DialogContentText>
              <Box className={classes.loaderAlign}>
                <KenLinearProgress delay={400} />
              </Box>
            </DialogContent>
            {/* {handleAck()} */}
          </>
        ) : openSuccess && openSuccess === true ? (
          <>
            <DialogTitle className={classes.title}>
              Assessment Saved
            </DialogTitle>
            <DialogContent>
              <img src={AssessmentSavedSuccess} className={classes.imgCenter} />
              <DialogContentText className={classes.successText}>
                Congratulations, you have successfully created and saved a new
                assessment.
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actionArea}>
              <KenButton
                onClick={handleGoAssignment}
                variant="outlined"
                color="primary"
              >
                Create another assessment
              </KenButton>
              <KenButton
                onClick={handleGoHome}
                color="primary"
                autoFocus
                variant="contained"
              >
                Go to Activities
              </KenButton>
              <KenButton
                onClick={handleClose}
                color="primary"
                autoFocus
                variant="contained"
              >
                Back
              </KenButton>
            </DialogActions>
          </>
        ) : (
          ''
        )}
      </Dialog>
    </>
  );
}
