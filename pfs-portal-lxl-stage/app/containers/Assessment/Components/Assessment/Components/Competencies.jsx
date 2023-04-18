import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenInputField from '../../../../../components/KenInputField';
import KenSelect from '../../../../../components/KenSelect';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import { useTranslation } from 'react-i18next';
import AssessmentData from '../../../AssessmentDetails.json';

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



}));

export default function Competencies(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue } = props;
    const [competencyArr, setCompetencyArr] = useState(AssessmentData.Competencies)
    const [courseCompetency, setCourseCompetency] = useState(AssessmentData.CourseCompetency)


    console.log(values, 'vl');
    const classes = useStyles();
    const { t } = useTranslation();


    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('CompetencyLabels:Competencies')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} className={classes.selectBoxClass}>
                    <KenSelect
                        name="Course Competency"
                        // required={true}
                        label={<span className={classes.inputBaseClass}>{t('CompetencyLabels:Course_Competencies')}</span>}
                        options={courseCompetency}
                        value={values.courseCompetency}
                        onChange={e => { setFieldValue('courseCompetency', e.target.value); }}
                        errors={errors?.courseCompetency}
                        setFieldTouched={setFieldTouched}
                        touched={touched?.courseCompetency}
                    />
                </Grid>
                <Grid xs={12} md={12} item >
                    <KenRadioGroup
                        label={t('CompetencyLabels:Upon_Activity_Completion')}
                        options={competencyArr}
                        defaultValue={() => {
                            setFieldValue('uponActivityCompletion', competencyArr[1].value);
                            return competencyArr[1].value;
                        }}
                        onChange={(e) => setFieldValue('uponActivityCompletion', e)}
                        setFieldTouched={setFieldTouched}
                        name="uponActivityCompletion"
                        value={values.uponActivityCompletion}
                        variant="outline"
                        errors={errors?.uponActivityCompletion}
                        touched={touched?.uponActivityCompletion}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
