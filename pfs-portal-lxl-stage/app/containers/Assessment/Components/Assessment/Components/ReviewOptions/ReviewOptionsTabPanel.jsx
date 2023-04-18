import React from 'react';
import { Box, Grid } from '@material-ui/core';
import OptionsSelection from './OptionsSelection';
import SelectedTabTemplate from './SelectedTabTemplate';

export default function ReviewOptionsTabPanel(props) {
  const { reviewOptions, onChange, tabId } = props;

  return (
    <>
      <Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item sm={12} md={3}>
              <OptionsSelection
                reviewOptions={reviewOptions}
                onChange={onChange}
                tabId={tabId}
              />
            </Grid>
            <Grid item sm={12} md={9}>
              <SelectedTabTemplate reviewOptions={reviewOptions} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
