import React, { useEffect, useState } from 'react';

import {
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  InputBase,
  InputAdornment,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Divider,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
  getCourseActivities
} from '../../../utils/ApiService';

const FunActivity = () => {
  
  const [data ,setData] =useState();
  const ContactId = localStorage.getItem('userDetails');
  useEffect(() => {
    getCourseActivities(ContactId?.ContactId)
      .then(res => {
        // console.log('getcourseActivities', res);
        setData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [ContactId]);
  
  console.log(data)
  // const params = useParams();
  // console.log("params", params);
  return (
    <Box minHeight="100%">
      <Grid item xs={12} style={{ height: '200vh', background: 'white' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: '20px' }}
          >
            <Typography>
              <b>Fun Questions</b>
            </Typography>
            <p />
          </Grid>

          <Grid style={{ marginLeft: '50px' }}>
            <Typography>
              <p> Q1. What was Patrick getting prepared for? (Fun Q-MCQ)</p>
            </Typography>

            <Typography>
              {' '}
              <p>Show and tell (correct Answer)</p>
            </Typography>

            <Typography>
              <p>Mike time</p>
            </Typography>

            <Typography>
              <p>Poem recitation</p>
            </Typography>

            <Typography>
              <p>Oral exam</p>
            </Typography>
          </Grid>

          <Grid style={{ marginLeft: '50px' }}>
            <h3>FEEDBACK : WELL ATTEMPTED</h3>
            <Typography>
              <p>
                Q3. What does Patrick do to get rid of the butterflies in his
                stomach?\(Fuml@eFillinthe blanks)
              </p>
            </Typography>
            <Typography>
              <p>a) He tries to use a...stomach.</p>
            </Typography>
            <Typography>
              <p>b) He refuses to eat ..grow stronger.</p>
            </Typography>
            <Typography>
              <p>c) He holds a out of his stomach.</p>
            </Typography>
          </Grid>
          <Grid style={{ marginLeft: '50px' }}>
            <h3>FEEDBACK : WELL ATTEMPTED</h3>

            <Typography>
              <p>
                Q7. Have you ever felt like you had butterflies in your
                stomach?. (ATIIESSay).{' '}
              </p>
            </Typography>
            <Typography>
              <p>* Vaccum’ to suck the butterflies out of his *Plants*</p>
            </Typography>
            <Typography>
              <p>
                because he is afraid the butterflies *Flowers* near his mouth to
                make the butterflies fly
              </p>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FunActivity;
