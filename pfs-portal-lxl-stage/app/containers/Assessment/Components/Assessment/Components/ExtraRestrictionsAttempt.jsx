import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenSelect from '../../../../../components/KenSelect';
import KenCheckbox from '../../../../../global_components/KenCheckbox/index';
import KenInputField from '../../../../../components/KenInputField';
import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
// import AssessmentData from '../../../AssessmentDetails.json';

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
    wrap: {
        marginBottom: 24,
    },
    inputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
    },
    tagLabel: {
        fontSize: 12,
        color: theme.palette.KenColors.neutral400,
        marginBottom: 4,
    },
    addLabel: {
        fontStyle: 'italic',
    },
    KenInputsMargin: {
        marginBottom: 16
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
    },
    gradeLabel: {
        fontSize: 12,
        color: theme.palette.KenColors.neutral400,
    },
    boxMargin: {
        marginBottom: 10,
        flexFlow: 'nowrap'
    },
    minutesPos: {
        position: 'absolute',
        top: -14,
        width: '100%',
        left: 0
    }
}));

export default function ExtraRestrictionsAttempt(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue, setValues, handleChange } = props;
    const [minutesArr, setMinutesArr] = useState([])

    console.log(values, 'vl');

    const classes = useStyles();

    const { t } = useTranslation();

    const change = (name, e, index) => {
        handleChange(e);
        setFieldTouched(name, true, false);
        setFieldValue(name, e.target.checked);
        // setValues(values);
    };
    const inputchange = (name, e, index) => {
        handleChange(e);
        setFieldValue(name, e.target.value);
    };

    useEffect(() => {
        let minutes = Array.from(Array(60).keys()).map(item => {
            let min = String(item);
            return {
                "label": min.length == 1 ? '0' + item : String(item),
                "value": min.length == 1 ? '0' + item : String(item)
            }
        })
        setMinutesArr(minutes)
    }, [])

    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:Extra_Restrictions_on_Attempts')}</Typography>
            <Grid item sm={6} className={classes.KenInputsMargin}>
                <KenInputField
                    type="password"
                    label={t("appearance:Password_for_assessment")}
                    placeholder="enter password"
                    value={values.passwordAssessment}
                    setFieldTouched={setFieldTouched}
                    name="passwordAssessment"
                    onChange={inputchange.bind(null, 'passwordAssessment')}
                    errors={errors?.passwordAssessment}
                    touched={touched?.passwordAssessment}
                />
            </Grid>
            <Grid item sm={6} className={classes.KenInputsMargin}>
                <KenInputField
                    label={t("labels:networkAddress")}
                    placeholder="enter address"
                    value={values.networkAddress}
                    setFieldTouched={setFieldTouched}
                    name="networkAddress"
                    onChange={inputchange.bind(null, 'networkAddress')}
                    errors={errors?.networkAddress}
                    touched={touched?.networkAddress}
                />
            </Grid>
            <Grid mb={4} md={6} xs={10} container className={classes.boxMargin}>
                {/* <KenTimePicker
                        timerType="material"
                        ampm={false}
                        inputBaseRootClass={classes.timepickerBaseClass}
                        label="Delay between 1st and 2nd attempt"
                        onChange={newValue => { setFieldValue('delayBtwInitialAttempt', newValue); }}
                        value={values.delayBtwInitialAttempt}
                        setFieldTouched={setFieldTouched}
                        name="delayBtwInitialAttempt"
                        variant="outline"
                        errors={errors?.delayBtwInitialAttempt}
                        touched={touched?.delayBtwInitialAttempt}
                    /> */}
                <Grid md={10} item className={classes.boxMargin}>
                    <Typography className={classes.gradeLabel}>{t("labels:delayInitialAttempt")}</Typography>
                    <Grid container>
                        <Grid sm={5} >
                            <KenInputField
                                placeholder="In Hours"
                                type={"number"}
                                inputBaseRootClass={classes.inputClass}
                                value={values.delay1Hours}
                                setFieldTouched={setFieldTouched}
                                name={`delay1Hours`}
                                onChange={newValue => { setFieldValue(`delay1Hours`, newValue.target.value); }}
                                errors={errors?.delay1Hours}
                                touched={touched?.delay1Hours}
                            />
                        </Grid>
                        <Grid sm={3} style={{ position: 'relative' }}>
                            {minutesArr.length > 0 &&
                                <KenSelect
                                    inputBaseRootClass={classes.inputBaseClass}
                                    setMinHeight={160}
                                    options={minutesArr}
                                    onChange={newValue => { setFieldValue(`delay1Minutes`, newValue.target.value); }}
                                    value={values.delay1Minutes}
                                    defaultValue={newValue => { setFieldValue(`delay1Minutes`, minutesArr[0].value) }}
                                    setFieldTouched={setFieldTouched}
                                    name={'delay1Minutes'}
                                    variant="outline"
                                // errors={errors?.delay1 ? errors?.delay1['minutes'] : null}
                                // touched={touched?.delay1 ? touched?.delay1['minutes'] : null}
                                />}
                            {/* <span className={classes.minutesPos}>Minutes</span> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid md={10} item className={classes.boxMargin}>
                    <Typography className={classes.gradeLabel}>{t("labels:delayLaterAttempt")}</Typography>
                    <Grid container>
                        <Grid sm={5} >
                            <KenInputField
                                placeholder="In Hours"
                                inputBaseRootClass={classes.inputClass}
                                value={values.delay2Hours}
                                setFieldTouched={setFieldTouched}
                                type={"number"}
                                name={'delay2Hours'}
                                onChange={newValue => { setFieldValue('delay2Hours', newValue.target.value); }}
                                errors={errors?.delay2Hours}
                                touched={touched?.delay2Hours}
                            />
                        </Grid>
                        <Grid sm={3} style={{ position: 'relative' }}>
                            {minutesArr.length > 0 &&
                                <KenSelect
                                    inputBaseRootClass={classes.inputBaseClass}
                                    setMinHeight={160}
                                    options={minutesArr}
                                    onChange={newValue => { setFieldValue(`delay2Minutes`, newValue.target.value); }}
                                    value={values.delay2Minutes}
                                    defaultValue={newValue => { setFieldValue(`delay2Minutes`, minutesArr[0].value) }}
                                    setFieldTouched={setFieldTouched}
                                    name={`delay2Minutes`}
                                    variant="outline"
                                // errors={errors?.delay2 ? errors?.delay2['minutes'] : null}
                                // touched={touched?.delay2 ? touched?.delay2['minutes'] : null}
                                />}
                            {/* <span className={classes.minutesPos}>Minutes</span> */}
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid md={5} item className={classes.KenInputsMargin}>
                    <KenTimePicker
                        timerType="material"
                        ampm={false}
                        label={t("labels:delayLaterAttempt")}
                        inputBaseRootClass={classes.timepickerBaseClass}
                        onChange={newValue => { setFieldValue('delayBtwLaterAttempt', newValue); }}
                        value={values.delayBtwLaterAttempt}
                        setFieldTouched={setFieldTouched}
                        name="delayBtwLaterAttempt"
                        variant="outline"
                        errors={errors?.delayBtwLaterAttempt}
                        touched={touched?.delayBtwLaterAttempt}
                    />
                </Grid> */}
            </Grid>
            <Grid item sm={12} className={classes.KenInputsMargin}>
                <Grid md={6} item >
                    <KenCheckbox
                        label={t('labels:Enable_Full_Screenpopup_With_Some_Javascript_Security')}
                        value={values.browsersecurity}
                        name="browsersecurity"
                        onChange={change.bind(null, 'browsersecurity')}
                    />
                </Grid>
                <Grid md={6} item >
                    <KenCheckbox
                        label={t('labels:Allow_Quiz_To_Be_Attempted_Offline')}
                        value={values.quizOfflineAttemptAllow}
                        name="quizOfflineAttemptAllow"
                        onChange={change.bind(null, 'quizOfflineAttemptAllow')}
                    />
                </Grid>
                <Grid md={6} item >
                    <KenCheckbox
                        label={t('labels:Webcam_Acknowledge_Before_Attempt')}
                        value={values.proctoringrequired}
                        name="proctoringrequired"
                        onChange={change.bind(null, 'proctoringrequired')}
                    />
                </Grid>
            </Grid>
        </Box>

    );
}
