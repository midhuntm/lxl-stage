import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
// import KenSelect from '../../../../../components/KenSelect';
import KenCheckbox from '../../../../../global_components/KenCheckbox/index';
import KenSelect from '../../../../../components/KenSelect/index';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenInputField from '../../../../../components/KenInputField';
import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
import { useTranslation } from 'react-i18next';
import assessmentsData from '../../../AssessmentDetails.json';

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
    // labelText:
}));

export default function CommonModuleSettings(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue, handleChange, setValues } = props;
    const [groupingArray, setGroupingArray] = React.useState(assessmentsData.Grouping);
    const [commonModuleGrouping, setCommonModuleGrouping] = React.useState(assessmentsData.CommonModuleGrouping)
    const [showGrouping, setShowGrouping] = React.useState(false)
    console.log(values, 'vl');

    const classes = useStyles();

    const { t } = useTranslation();

    const change = (name, e, index) => {
        // e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        // setFieldTouched(name, true, false);
        if (name === 'showAssessmentCoursePage' && e.target.checked === true) {
            values.showAssessmentCoursePage = e.target.checked;
            setFieldValue(name, e.target.checked);
            setValues(values);
        }

        // console.log(values);
    };
    const onHandleGroupMode = (val) => {
        setFieldValue('groupMode', val);
        if (val !== 'No groups') {
            setShowGrouping(true)
        }
        else setShowGrouping(false)
    }
    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:Common_Module_Settings')}</Typography>
            <Grid item sm={8} className={classes.KenInputsMargin}>
                <Grid md={8} item >
                    <KenCheckbox
                        disabled={values.disabled}
                        label={t('labels:Show_Assessment_On_Course_Page')}
                        value={values.showAssessmentCoursePage}
                        name="showAssessmentCoursePage"
                        onChange={change.bind(null, 'showAssessmentCoursePage')}
                    />
                </Grid>
                <Grid md={6} item>
                    <KenInputField
                        label="ID number"
                        placeholder="enter id number"
                        value={values.moduleID}
                        setFieldTouched={setFieldTouched}
                        name="moduleID"
                        onChange={change.bind(null, 'moduleID')}
                        errors={errors?.moduleID}
                        touched={touched?.moduleID}
                    />
                </Grid>
            </Grid>

            <Grid xs={12} item md={6} className={classes.KenInputsMargin}>
                <KenRadioGroup
                    value={values.groupMode}
                    label={t('labels:Group_Mode')}
                    options={commonModuleGrouping}
                    onChange={onHandleGroupMode}
                    defaultValue={() => {
                        setFieldValue('groupMode', commonModuleGrouping[0]);
                        return commonModuleGrouping[0];
                    }}
                    setFieldTouched={setFieldTouched}
                    name="groupMode"
                    variant="outline"
                    errors={errors?.groupMode}
                    touched={touched?.groupMode}
                // required
                />
            </Grid>
            {showGrouping && <Grid item xs={12} md={3} className={classes.KenInputsMargin}>
                <KenSelect
                    name="Grouping"
                    // required={true}
                    label={<span className={classes.inputBaseClass}>Grouping</span>}
                    options={groupingArray}
                    value={values.grouping}
                    onChange={e => { setFieldValue('grouping', e.target.value); }}
                    errors={errors?.grouping}
                    touched={touched?.grouping}
                    setFieldTouched={setFieldTouched}
                />
            </Grid>
            }
        </Box >

    );
}
