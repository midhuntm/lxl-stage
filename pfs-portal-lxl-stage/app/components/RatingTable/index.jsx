import {
  Box,
  Paper,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Checkbox,
  DialogActions,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import KenDialogBox from '../../components/KenDialogBox/index';
import KenButton from '../../global_components/KenButton';
import KenSnackbar from '../../components/KenSnackbar/index';
import KenTextArea from '../../global_components/KenTextArea';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect } from 'react';
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#F1F5FA',
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    color: '#092682',
  },
  body: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    color: '#505F79',
  },
  '&:.MuiDialog-paperFullWidth': {
    height: '100px !important',
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    //   '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    //   },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    borderRadius: '3px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'initial',
  },
});
export default function RatingTable(props) {
  const { parameters, handleChange, onSubmit } = props;
  const [open, setOpen] = React.useState(false);
  const [allSelected, setAllSelected] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const classes = useStyles();

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (allSelected) {
      handleSnackbarOpen('error', 'Please fill all feedback fields.');
    } else {
      setOpen(true);
    }
  };
  const radioData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    // { label: '6', value: '6' },
    // { label: '7', value: '7' },
    // { label: '8', value: '8' },
    // { label: '9', value: '9' },
    // { label: '10', value: '10' },
  ];
  const checkData = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const handleSnackbarOpen = (severity, message) => {
    setOpenSnackbar(true);
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
  };

  useEffect(() => {
    const allSelectedVal = parameters.every(
      value => value.rating !== undefined
    );
    if (allSelectedVal == true) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  }, [parameters]);

  return (
    <Box>
      <KenSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        position="Bottom-Right"
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Parameters</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters?.map((item, index) => {
              return (
                <StyledTableRow>
                  <StyledTableCell>{item.FeedbackTitle}</StyledTableCell>
                  <StyledTableCell align="right">
                    <FormControl style={{width: '100%'}}>
                      {item?.recordType === 'Rating' ? (
                        <RadioGroup
                          row={true}
                          aria-label={item.FeedbackTitle}
                          name="cots"
                          value={item.rating}
                          onChange={event =>
                            handleChange(event, item, index, item?.recordType)
                          }
                        >
                          {radioData?.map(el => {
                            return (
                              <FormControlLabel
                                style={{
                                  padding: '0px 10px',
                                  marginLeft: '10px',
                                }}
                                labelPlacement="start"
                                value={el.value}
                                control={<Radio />}
                                label={el.label}
                              />
                            );
                          })}
                        </RadioGroup>
                      ) : item?.recordType === 'CheckBox' ? (
                        <div className={classes.checkboxGroup}>
                          {checkData?.map(el => {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={item.rating}
                                    onChange={event =>
                                      handleChange(
                                        event,
                                        item,
                                        index,
                                        item?.recordType
                                      )
                                    }
                                    name={el.label}
                                  />
                                }
                                label={el.label}
                              />
                            );
                          })}
                        </div>
                      ) : item?.recordType === 'Descriptive' ? (
                        <div style={{ width: '100%' }}>
                          <KenTextArea
                            multiline={true}
                            minRows={3}
                            placeholder=""
                            name="comments"
                            value={item.rating}
                            onChange={event =>
                              handleChange(event, item, index, item?.recordType)
                            }
                          />
                        </div>
                      ) : null}
                    </FormControl>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <KenButton
          variant="primary"
          onClick={handleSubmit}
          buttonClass={classes.button}
          endIcon={<CheckIcon />}
        >
          Submit
        </KenButton>
      </Box>

      <Dialog open={open} handleCancel={handleCancel}>
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit this feedback?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <KenButton
            variant="primary"
            onClick={onSubmit}
            disabled={allSelected}
            buttonClass={classes.button}
          >
            Confirm
          </KenButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
