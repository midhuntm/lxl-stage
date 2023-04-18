import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import KenButton from '../../global_components/KenButton/index';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    height: 'auto',
    // height: 'calc(100% - 64px)'
  },

  dialogContentText: {
    height: '100%',
    margin: '0px',
  },
}));

export default function AlertDialog(props) {
  const {
    open,
    handleClose,
    handleCancel,
    handleSendInvite,
    html,
    title,
    maxWidth,
    children,
    titleStyle,
    dialogActionFlag = true,
    yesNoActionFlag = false,
    styleOverrides,
    onClose,
    showCustomButtons,
    submitButtonText,
    cancelButtonText,
    submitButtonClick,
    cancelButtonClick,
    customButtonText,
    disableSubmit,
    disabledOk = false,
    disabledCancel = false,
    disabledSend = true,
    onhandleYesClick,
    onhandleNoClick
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose || handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={maxWidth}
        classes={{
          paper: styleOverrides?.dialogPaper
            ? styleOverrides.dialogPaper
            : classes.dialogPaper,
        }}
      >
        {title && (
          <DialogTitle id="alert-dialog-title" className={titleStyle}>
            {title}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.dialogContentText}
          >
            {html || children}
          </DialogContentText>
        </DialogContent>
        {dialogActionFlag && (
          <DialogActions>
            {handleClose && (
              <KenButton
                onClick={handleClose}
                disabled={disabledOk}
                variant="primary"
              >
                {t('labels:Ok')}
              </KenButton>
            )}
            {handleCancel && (
              <KenButton
                onClick={handleCancel}
                variant="secondary"
                disabled={disabledCancel}
              >
                {t('labels:Cancel')}
              </KenButton>
            )}
            {handleSendInvite && (
              <KenButton
                onClick={handleSendInvite}
                variant="primary"
                disabled={disabledSend}
              >
                {customButtonText}
              </KenButton>
            )}
          </DialogActions>
        )}
        {yesNoActionFlag && (
          <DialogActions style={{ justifyContent: 'flex-end' }}>
            <KenButton onClick={onhandleYesClick} variant="primary">
              {t('labels:Yes')}
            </KenButton>
            <KenButton onClick={onhandleNoClick} variant="secondary">
              {t('labels:No')}
            </KenButton>
          </DialogActions>
        )}
        {showCustomButtons && (
          <DialogActions style={{ justifyContent: 'flex-end' }}>
            <KenButton onClick={cancelButtonClick} variant="secondary">
              {cancelButtonText}
            </KenButton>
            <KenButton onClick={submitButtonClick} disabled={disableSubmit} variant="primary">
              {submitButtonText}
            </KenButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
