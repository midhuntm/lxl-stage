import React from 'react';
import { Box, Grid } from '@material-ui/core';
import AssignmentCard from './AssignmentsCard';
import EmptyDataComponent from './EmptyDataComponent';

export default function AssessmentsTab(props) {
  const { data } = props;
  return (
    <Box>
      <Grid container spacing={2}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map(obj => (
            <Grid item>
              <AssignmentCard
                name={obj?.name}
                timeopen={obj?.timeopen}
                timeclose={obj?.timeclose}
                url={obj?.url}
                {...obj}
                isDisabled={obj?.isDisabled}
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
