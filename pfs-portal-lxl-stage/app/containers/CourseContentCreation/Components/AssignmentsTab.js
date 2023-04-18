import React from 'react';
import { Box, Grid } from '@material-ui/core';
import AssignmentCard from './AssignmentsCard';
import EmptyDataComponent from './EmptyDataComponent';

export default function AssignmentsTab(props) {
  const { data } = props;
  return (
    <Box>
      <Grid container spacing={2}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map(obj => (
            <Grid item>
              <AssignmentCard
                name={obj?.name}
                startDate={obj?.allowsubmissionsfromdate}
                dueDate={obj?.duedate}
                url={obj?.url}
              />
            </Grid>
          ))
        ) : (
          <EmptyDataComponent />
        )}
      </Grid>
    </Box>
  );
}
