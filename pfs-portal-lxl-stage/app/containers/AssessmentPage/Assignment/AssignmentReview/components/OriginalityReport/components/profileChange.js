import { Box, Grid } from '@material-ui/core';
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function ProfileChange(props) {
  const { submittedUsers, currentStudent } = props
  return (
    <Grid container spacing={1} alignItems="center">
      {/* <Grid item xs={2}>
        <ChevronLeftIcon />
      </Grid> */}
      <Grid item xs={8}>
        <p style={{ fontSize: 14, fontWeight: 600 }}>{submittedUsers[0]?.username}</p>
      </Grid>
      {/* <Grid item xs={2}>
        <ChevronRightIcon />
      </Grid> */}
    </Grid>
  );
}
