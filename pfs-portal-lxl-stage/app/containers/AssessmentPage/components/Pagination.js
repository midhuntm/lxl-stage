import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import KenButton from '../../../global_components/KenButton';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles(theme => ({
  root: {
    margin: 32,
    [theme.breakpoints.down('xs')]: {
      margin: 12,
    },
  },
}));

export default function StepperFooter(props) {
  const classes = useStyles();
  const {
    stepperHandleBack,
    stepperHandleNext,
    stepperActiveStep,
    stepperSteps = [],
    handleSubmit,
    stepsCount,
    handelSaveAnswer,
    answered
  } = props;
  const totalSteps = stepsCount || stepperSteps.length;
  return (
    <div className={classes.root}>
      <Grid container justify="flex-end">
        <Grid item>
          <KenButton
            variant="secondary"
            startIcon={<NavigateBeforeIcon />}
            style={{ marginRight: 8 }}
            onClick={stepperHandleBack}
            disabled={stepperActiveStep === 0}
          >
            Previous
          </KenButton>
          {/* Enable for saved answer for inprogress attempts */}
          {/* <KenButton
            variant="secondary"
            startIcon={<SaveIcon />}
            style={{ marginRight: 8 }}
            onClick={handelSaveAnswer}
            disabled={answered && answered ? false:true}
          >
            Save Answer
          </KenButton> */}
          <KenButton
            variant="secondary"
            // TODO: validate form and check validity and submit
            onClick={stepperHandleNext}
            /* endIcon={
              
              stepperActiveStep === totalSteps - 1 ? (<img src={RightArrowIcon} alt="" />) : (
                <img src={RightArrowIcon} alt="" style={stepperActiveStep === totalSteps - 1? {color:'#ccc'}:{}}  

                />
              )
            } */
            endIcon={<NavigateNextIcon />}
            disabled={stepperActiveStep === totalSteps - 1}
          >
            Next
            {/* {stepperActiveStep === totalSteps - 1 ? 'Submit' : 'Next'} */}
          </KenButton>
        </Grid>
      </Grid>
    </div>
  );
}
