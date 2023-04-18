import React from "react";
import {
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

function closeOpenedWindow() {
  window.close();
}
export default function CloseTab() {
  return (
    <Grid container alignItems="center" justify="center" direction="column" style={{minHeight:'100vh'}}>
        <Typography variant='h3'>Thank You..</Typography>
          
        
      <Button
        variant="contained"
        target="blank"
        color="primary"
        onClick={closeOpenedWindow}
      >
        Okay, done
      </Button>
    </Grid>
  );
}
