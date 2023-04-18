import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

export default function FilterComponent(props) {
  const {
    content,
    title,
    open,
    onClose,
    onCancelClick,
    onOkClick,
    okText,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onCancelClick && (
          <Button onClick={onCancelClick} color="primary">
            cancel{' '}
          </Button>
        )}
        {onOkClick && (
          <Button onClick={onOkClick} color="primary">
            {okText || 'Ok'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
