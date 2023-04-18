import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import KenButton from '../../../global_components/KenButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { groupBy } from 'lodash';
export default function Header(props) {
  const { handleQuestionsBankBack, handleAddQuestionManually, showAddManuallyBtn, setShowAddManuallyBtn } = props;
  return (
    <Grid
      container
      component={Paper}
      justifyContent="space-between"
      style={{ padding: '16px' }}
    >
      <Grid item md={6} xs={12}>
        <KenButton
          label={'Question Bank'}
          variant="text"
          startIcon={!showAddManuallyBtn ? <ArrowBackIcon /> : false}
          size="small"
          onClick={handleQuestionsBankBack}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid
          container
          spacing={2}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* <Grid item >
        <KenButton label={'Upload Question'} variant="outlined" size="small" />
        
      </Grid> */}
          {showAddManuallyBtn &&
            <Grid item>
              <KenButton
                label={'Add Question Manually'}
                variant="primary"
                size="small"
                onClick={handleAddQuestionManually}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}
