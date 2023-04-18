import React, { useState } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import KenSlider from '../../../../../components/KenSlider';
import KenInputField from '../../../../../components/KenInputField/index';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: '10px',
  },
  paperBorder: {
    border: `0.5px solid ${theme.palette.KenColors.neutral40}`,
  },
  btnBox: {
    display: 'flex',
    cursor: 'pointer',
    width: 'fit-content',
    alignItems: 'center',
  },
  btnLabel: {
    marginLeft: '5px',
    fontWeight: '600',
    fontSize: '14px',
  },
  container: {
    // display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  resetBtn: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '10px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
    },
  },
  slider: {
    minHeight: '400px',
  },
  wrap: {
    marginBottom: 0,
  },
  Feedbackwrap: {
    marginBottom: 0,
    width: '30%',
  },
}));

export default function Feedback(props) {
  const { values, touched, errors, setFieldTouched, setFieldValue } = props;
  const { data } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  // const [feedbacks, setFeedbacks] = useState(data || []);

  const handleAddFeedback = () => {
    const fBacks = [...values.overallfeedback];
    fBacks.push({
      boundary: [100, 50],
      feedbacktext: '',
    });
    setFieldValue('overallfeedback', [...fBacks]);

    // setFeedbacks([...fBacks]);
  };
  const handleRemoveFeedback = index => {
    const fBacks = [...values.overallfeedback];
    if (index > -1) {
      fBacks.splice(index, 1);
    }
    // setFeedbacks([...fBacks]);
    setFieldValue('overallfeedback', [...fBacks]);
  };

  const handleResetFeedback = () => {
    // setFeedbacks([]);
    setFieldValue('overallfeedback', []);
  };

  const marks = [
    { value: 100, label: '100%' },
    { value: 90, label: '90%' },
    { value: 80, label: '80%' },
    { value: 70, label: '70%' },
    { value: 60, label: '60%' },
    { value: 50, label: '50%' },
    { value: 40, label: '40%' },
    { value: 30, label: '30%' },
    { value: 20, label: '20%' },
    { value: 10, label: '10%' },
    { value: 0, label: '0%' },
  ];

  function valueText(value) {
    return `${value}%`;
  }

  const handleRangeChange = (event, newValue, index) => {
    let fbs = [...values.overallfeedback];
    fbs[index].boundary = newValue;
    setFieldValue('overallfeedback', fbs);
    // setFeedbacks(fbs);
    console.log('range chage ', index, ' new valu', newValue);
  };

  const handleFeedbackChange = (event, index) => {
    let fbs = [...values.overallfeedback];
    fbs[index].feedbacktext = event.target.value;
    setFieldValue('overallfeedback', fbs);
    // setFeedbacks(fbs);
    console.log('feedbacke chage ', fbs);
  };

  const Button = btnProps => {
    const { handleClick, label, startIcon, className, dataTestid } = btnProps;
    return (
      <Box
        onClick={handleClick}
        className={`${classes.btnBox} ${className}`}
        data-testid={dataTestid || 'button'}
      >
        {startIcon}
        <Typography
          className={classes.btnLabel}
          component="span"
          color="primary"
        >
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box mb={3}>
        <Paper
          elevation={0}
          className={
            values.overallfeedback?.length > 0
              ? `${classes.paper} ${classes.paperBorder}`
              : classes.paper
          }
          data-testid="feedback-list"
        >
          {values.overallfeedback?.map((f, index) => {
            return (
              <>
                <Box
                  p={2}
                  className={classes.wrap}
                  data-testid="feedback-list-item"
                >
                  <Box mb={3}>
                    <Button
                      dataTestid="remove"
                      handleClick={() => handleRemoveFeedback(index)}
                      //   label={`Remove feedback ${index + 1} : ${f.feedback}`}
                      label={`Remove overall feedback`}
                      startIcon={
                        <RemoveCircleOutlineIcon
                          fontSize="small"
                          color="primary"
                        />
                      }
                    />
                  </Box>
                  <Box mb={3} className={classes.wrap}>
                    <Hidden smUp>
                      <KenSlider
                        orientation="vertical"
                        minHeight="400px"
                        valueText={valueText}
                        value={f.boundary}
                        handleChange={(e, n) => handleRangeChange(e, n, index)}
                        marks={marks}
                        label={`Grade range ${index + 1}`}
                        track={true}
                        className={classes.slider}
                        min={0}
                        max={100}
                      />
                    </Hidden>
                    <Hidden smDown>
                      <KenSlider
                        valueText={valueText}
                        value={f.boundary}
                        handleChange={(e, n) => handleRangeChange(e, n, index)}
                        marks={marks}
                        label={`Grade range ${index + 1}`}
                        track={true}
                        min={0}
                        max={100}
                      />
                    </Hidden>
                  </Box>
                  <Box
                    mb={2}
                    className={classes.Feedbackwrap}
                    data-testid="feedback-input"
                  >
                    <KenInputField
                      label={`Feedback ${index + 1}`}
                      value={f.feedbacktext}
                      onChange={e => handleFeedbackChange(e, index)}
                    />
                  </Box>
                </Box>
              </>
            );
          })}
        </Paper>

        {/* <Box
          display={{ xs: 'block', md: 'flex' }}
          className={classes.container}
        >
          <Button
            dataTestid="add"
            handleClick={handleAddFeedback}
            label={
              values.overallfeedback?.length > 0
                ? 'Add more range for feedback'
                : 'Add overall feedback'
            }
            startIcon={
              <AddCircleOutlineIcon fontSize="small" color="primary" />
            }
          />
          {values.overallfeedback?.length > 0 && (
            <Button
              dataTestid="reset"
              handleClick={handleResetFeedback}
              label="Cancel"
              startIcon={<HighlightOffIcon fontSize="small" color="primary" />}
              className={classes.resetBtn}
            />
          )}
        </Box> */}
      </Box>
    </>
  );
}
