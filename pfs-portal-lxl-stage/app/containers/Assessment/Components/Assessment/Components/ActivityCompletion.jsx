import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenSelect from '../../../../../components/KenSelect/index';
import { useTranslation } from 'react-i18next';
import assessmentData from '../../../AssessmentDetails.json';
import KenCheckbox from '../../../../../global_components/KenCheckbox/index';

import KenDateTimePicker from '../../../../../global_components/KenDateTimePicker/index';
import KenTimePicker from '../../../../../global_components/KenTimePicker/index';

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.KenColors.neutral10,
        padding: 16,
        marginBottom: 20
    },
    wrapLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 30
    },
    header: {
        color: theme.palette.KenColors.neutral900,
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 16,
    },
    title: {
        color: theme.palette.KenColors.neutral400,
        fontSize: 13,
        marginBottom: 16
    },
    wrap: {
        marginBottom: 24,
        marginTop: 16
    },
    selectBoxLabel: {
        color: theme.palette.KenColors.neutral400,
        fontSize: 12,
        marginTop: 16
    },
    offset: {
        marginTop: 16
    },
    timeInputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
        // marginRight: 4,
        // border: `1px solid ${theme.palette.KenColors.neutral40}`,
        borderRadius: '0px 3px 3px 0px'
    },
    dateInputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
        // marginRight: 4,
        // border: `1px solid ${theme.palette.KenColors.neutral40}`,
        borderRadius: '3px 0px 0px 3px'
    },
    offsetLeft: {
        marginLeft: 30
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
        borderRadius: 3
    }
}));

export default function ActivityCompletion(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue } = props;
    const [activityCompletionGrp, setActivityCompletionGrp] = useState(assessmentData.ActivityData)
    const [conditionsList, setConditionsList] = useState(assessmentData.ActivityWhenConditionMet)

    const [selectedOption, setSelectedOption] = useState(1)

    const classes = useStyles();

    const { t } = useTranslation();

    const handleChange = val => {
        // setValue(e.target.value);
        setFieldValue('completionTracking', val)
        if (String(val) == "1") setSelectedOption(1)
        else if (String(val) == "2") setSelectedOption(2)
        else setSelectedOption(0)
    };

    const change = (name, e, index) => {
        e.persist();
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    }

    const conditionsListHandle = (ele) => {
    }
    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:Activity_Completion')}</Typography>
            {/* <Typography className={classes.title}>{t('labels:Completion_Tracking')}</Typography> */}

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <KenRadioGroup
                        // label={t('labels:Select_Restriction_Date')}
                        label={t('labels:Completion_Tracking')}
                        // label=''
                        options={activityCompletionGrp}
                        defaultValue={() => {
                            setFieldValue('completionTracking', activityCompletionGrp[1].value);
                            return activityCompletionGrp[1].value;
                        }}
                        onChange={handleChange}
                        setFieldTouched={setFieldTouched}
                        name="Restriction Date"
                        value={values.completionTracking}
                        variant="outline"
                        errors={errors?.completionTracking}
                        touched={touched?.completionTracking}
                    />
                </Grid>
            </Grid>
            {selectedOption == 1 &&
                <Grid item xs={12} md={3} className={classes.offset}>
                    <KenDateTimePicker
                        label={t('labels:Expect_Completed_On')}
                        inputBaseRootClass={classes.dateInputBaseClass}
                        onChange={newValue => { setFieldValue('expectCompletedOnDate', newValue.target.value); }}
                        value={values.expectCompletedOnDate}
                        setFieldTouched={setFieldTouched}
                        name="expectCompletedOnDate"
                        variant="outline"
                        errors={errors?.expectCompletedOnDate}
                        touched={touched?.expectCompletedOnDate}
                    />
                </Grid>
            }
            {selectedOption == 2 &&
                <Grid className={classes.offset}>
                    {conditionsList.map((ele, i) => {
                        return (<Grid md={8} item key={i} className={classes.wrapLink}>
                            <KenCheckbox
                                disabled={values.disabled}
                                label={ele}
                                value={values.conditionsList}
                                name={ele}
                                onChange={() => conditionsListHandle(ele)}
                            />
                        </Grid>)
                    })}
                    <Grid container >
                        <Grid md={3} item style={{ marginTop: 16 }}>
                            <KenDateTimePicker
                                label={t('labels:Expect_Completed_On')}
                                inputBaseRootClass={classes.dateInputBaseClass}
                                onChange={newValue => { setFieldValue('expectCompletedOnDate', newValue.target.value); }}
                                value={values.expectCompletedOnDate}
                                setFieldTouched={setFieldTouched}
                                name="expectCompletedOnDate"
                                variant="outline"
                                errors={errors?.expectCompletedOnDate}
                                touched={touched?.expectCompletedOnDate}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Box >
    );
}
