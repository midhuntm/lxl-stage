import React from 'react';
import { Box, Grid } from '@material-ui/core';
import LessonsCard from './LessonsCard';
import EmptyDataComponent from './EmptyDataComponent';

export default function LessonsTab(props) {
  const { data } = props;
  return (
    <Box>
      <Grid container spacing={2}>
        {Array.isArray(data) && data.length > 0 ? (
          data.map(obj => (
            <Grid item>
              <LessonsCard
                name={obj?.name}
                startDate={obj?.available}
                dueDate={obj?.deadline}
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
