import {
  Avatar,
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import KenDialog from '../../../../../../../global_components/KenDialog';

const useStyles = makeStyles(theme => ({
  classParticipants: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '100%',
    color: '#7A869A',
  },
  participentDialogFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '100%',
    color: '#2B2B2B',
  },
}));
export default function StudentListDailog(props) {
  const classes = useStyles();
  const {
    studentData,
    openDialog,
    handleCloseDialog,
    handleClickOpenDialog,
  } = props;
  return (
    <KenDialog
      open={openDialog}
      handleClose={handleCloseDialog}
      handleClickOpen={handleClickOpenDialog}
      title={
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography className={classes.participentDialogFont}>
              Class: CSE A, B
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.participentDialogFont}>
              Total Students: {studentData.length}
            </Typography>
          </Grid>
        </Grid>
      }
    >
      <Paper style={{ padding: 12 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {studentData &&
            studentData.map((student, index) => {
              return (
                <Grid item md={6}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item md={2}>
                      {' '}
                      <Avatar>{student?.firstName.match(/\b(\w)/g)}</Avatar>
                    </Grid>
                    <Grid item md={10}>
                      <Box>
                        <Typography>
                          {student?.firstName}
                          {''} {student?.lastName}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </KenDialog>
  );
}
