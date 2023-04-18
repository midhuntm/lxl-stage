import { Box, Grid } from '@material-ui/core';
import React from 'react';
// import DocumentPreview from './DocumentPreview';
import EditPresentation from './EditPresentation';
// import PresentationPreview from './PresentationPreview';
// import VideoPreview from './VIdeoPreview';

export default function PreviewAndEditing() {
  return (
    <Box mt={2} spacing={2}>
      <Grid container item xs={12} md={12} sm={12} spacing={1}>
        {/* <Grid item md={12} sm={12} xs={12}>
          <PresentationPreview />
        </Grid> */}
        {/* <Grid item md={12} sm={12} xs={12}>
          <VideoPreview />
        </Grid> */}
        <Grid item md={12} sm={12} xs={12}>
          {/* <DocumentPreview/> */}
          <EditPresentation
            // values={values}
            // touched={touched}
            // errors={errors}
            // handleChange={handleChange}
            // handleBlur={handleBlur}
            // handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
