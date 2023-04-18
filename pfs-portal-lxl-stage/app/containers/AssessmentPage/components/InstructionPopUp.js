import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InstructionData from './InstructionData';
import { useTranslation } from 'react-i18next';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function InstructionPopUp(props) {
  const { quizid } = props;
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [instructionsData, setInstructionsData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
        <IconButton variant="contained">
          <DescriptionOutlinedIcon />
        </IconButton>
        <span>{t('labels:View_Instructions')}</span>
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('instructions:Important_Instructions_Guidelines')}
        </DialogTitle>
        <DialogContent dividers>
          <InstructionData
            quizid={quizid}
            instructionsData={instructionsData}
            setInstructionsData={setInstructionsData}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
