import React from 'react';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

export default function Multimedia(props) {
  const { question, mediaImg } = props;
  //image rendering code
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ maxHeight: '500px' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        <img src={mediaImg} style={{ maxHeight: '240px', maxWidth: '320' }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">{question}</DialogTitle>
        <DialogContent>
          <img
            src={mediaImg}
            style={{ maxHeight: '720', maxWidth: '1280px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back to assessment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
