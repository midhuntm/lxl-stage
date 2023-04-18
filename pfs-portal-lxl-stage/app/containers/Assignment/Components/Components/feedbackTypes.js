import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
// import KenRadioGroup from '../../../../global_components/KenRadioGroup/index';
import KenCheckBox from '../../../../global_components/KenCheckbox/index';
import KenSelect from '../../../../components/KenSelect';
import KenDateTimePicker from '../../../../global_components/KenDateTimePicker/index';
// import KenTimePicker from '../../../../global_components/KenTimePicker/index';
import KenInputField from '../../../../components/KenInputField/index';
import { useTranslation } from 'react-i18next';
import dropdownData from '../../AssignmentDetails.json';

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.KenColors.neutral10,
        padding: 16,
    },
    header: {
        color: theme.palette.KenColors.neutral900,
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 16,
    },
    periodContainer: {
        display: 'flex',
        marginLeft: 16,
    },
    gradeLabel: {
        fontSize: 12,
        color: theme.palette.KenColors.neutral400,
    },
    wrap: {
        marginBottom: 0,
    },
    boxMargin: {
        marginBottom: 10,
    },
    endQuiz: {
        [theme.breakpoints.only('xs')]: {
            marginTop: 8,
        },
        marginLeft: 20,
    },

    inputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
    },
    inputClass: {
        background: theme.palette.KenColors.kenWhite,
    },
    timepickerBaseClass: {
        width: '100%',
        padding: '10px 12px',
        transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        border: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
        backgroundColor: '#FAFBFC',
        // marginTop: 3,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 5,
        paddingLeft: 10,
        borderRadius: 3,
    },
    gradeContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    minutesPos: {
        position: 'absolute',
        top: -14,
        width: '100%',
        left: 0,
    },
}));

const FeedbackTypes = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        setFieldTouched,
        setFieldValue,
    } = props;

    const classes = useStyles();
    const { t } = useTranslation();

    const change = (name, e, index) => {
        e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    };
    const onHandleFeedbackTypes = (event, checked) => {
        let field = event.target.name;
        setFieldValue(field, checked);
    };

    return (
        <React.Fragment>
            <Box className={classes.container} mt={2}>
                <Typography className={classes.header}>
                    {t('labels:Feedback_Types')}
                </Typography>

                <Grid md={8} container item className={classes.boxMargin}>
                    <Typography className={classes.gradeLabel}>
                        {t('labels:Feedback_Types')}
                    </Typography>
                    <Grid md={12} container>
                        <Grid md={6} item>
                            <KenCheckBox
                                disabled={true}
                                label={t('labels:Feedback_comments')}
                                value={values.assignfeedback_comments_enabled}
                                name="assignfeedback_comments_enabled"
                                onChange={onHandleFeedbackTypes}
                            />
                        </Grid>
                        <Grid md={6} item>
                            <KenCheckBox
                                disabled={true}
                                // disabled={values.disabled}
                                label={t('labels:Feedback_files')}
                                value={values.assignfeedback_file_enabled}
                                name="assignfeedback_file_enabled"
                                onChange={onHandleFeedbackTypes}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};
export default FeedbackTypes;
