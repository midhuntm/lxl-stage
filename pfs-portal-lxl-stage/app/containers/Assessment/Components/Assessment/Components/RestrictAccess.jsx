import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenInputField from '../../../../../components/KenInputField';

import KenDateTimePicker from '../../../../../global_components/KenDateTimePicker/index';
import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenSelect from '../../../../../components/KenSelect/index';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import AssessmentData from '../../../AssessmentDetails.json';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import KenDialog from '../../../../../global_components/KenDialog';
import KenButton from '../../../../../global_components/KenButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.KenColors.neutral10,
        padding: 16,
    },
    wrapLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
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
        marginBottom: 4
    },
    gradeLabelClass: {
        marginTop: 10,
        marginBottom: 16
    },
    inputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
        // marginRight: 4
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
    tagLabel: {
        fontSize: 12,
        color: theme.palette.KenColors.neutral400,
        marginBottom: 4,
    },
    addLabel: {
        fontStyle: 'ita lic',
    },
    radioClass: {
        marginBottom: 4,
    },
    offsetLeft: {
        marginLeft: 10
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
    percentageField: {
        width: '100%',
        position: 'relative',
        marginRight: 10
    },
    spanPercentage: {
        padding: 12,
        position: "absolute",
        top: "31px",
        right: "10px",
        width: '38px',
        height: '37px',
        textAlign: 'center',
        border: 'none',
        borderLeft: `1px solid ${theme.palette.KenColors.flagIconBorderColor}`,
        borderRadius: '3px',
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
        borderRadius: 3
    },
    leftAligned: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    pointer: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    gridBox: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0
    },
    buttonClass: {
        marginRight: 15,
        minWidth: 'max-content',
        padding: '0px 10px'
    },
    restText: {
        width: '55%'
    }
}));

export default function RestrictAccess(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue } = props;

    const [ActivityCompletion, setActivityCompletion] = useState(AssessmentData.RestrictedAccess.activityCompData)
    const [activityLists, setAtivityLists] = useState([{ "label": "None", "value": 0 }])
    const [profileField1, setProfileField1] = useState(AssessmentData.RestrictedAccess.profileField1)
    const [profileField2, setProfileField2] = useState(AssessmentData.RestrictedAccess.profileField2)
    const [Grade, setGrade] = useState(AssessmentData.RestrictedAccess.Grade)
    const [openDialog, setOpenDialog] = React.useState(false);

    console.log(values, 'vl');
    const classes = useStyles();
    const { t } = useTranslation();

    const restrictionDateArr = [
        {
            label: 'From',
            value: '0',
        },
        {
            label: 'Until',
            value: '1',
        },
    ]

    // const ActivityCompletion2 = []

    const handleChange = e => {
        setFieldValue('restrictionDateOpt', e)
        console.log(e)
    };

    const handleAddNestedRestrictions = (e) => {
        handleClickOpen()
        // let upd = values.userProfile
        // upd.push({ profileField1: '', profileField2: '', typeSomething: '' })
        // setFieldValue('userProfile', upd)
    }
    const addUserProfile = () => {
        let upd = values.userProfile
        upd.push({ profileField1: '', profileField2: '', typeSomething: '' })
        setFieldValue('userProfile', upd)
    }

    const Button = btnProps => {
        const { handleClick, label, startIcon, className, dataTestid } = btnProps;
        return (
            <Box onClick={handleClick} className={`${classes.btnBox} ${className}`} data-testid={dataTestid || 'button'}>{startIcon}
                <Typography className={classes.btnLabel} component="span" color="primary">{label}</Typography>
            </Box>
        );
    };
    const change = (name, e, index) => {
        e.persist();
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    }
    const handleDelete = (row, i) => {
        if (values.userProfile.length > 1) {
            let upd = values.userProfile
            upd.splice(i, 1)
            setFieldValue('userProfile', upd)
        }

    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCancel = () => {
        setOpenDialog(false);
    };
    const onSelectRestriction = (type) => {
        setOpenDialog(false)
        switch (type) {
            case 'userprofile':
                addUserProfile()
                break;
            default:
                break;
        }
    }
    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:Restrict_Access')}</Typography>
            <Typography className={classes.title}>{t('RestricedAccess:Fill_The_Details_You_Want_To_Add_Restriction')}</Typography>
            {/* <Typography className={classes.selectBoxLabel}>{t('RestricedAccess:Activity_Completion')}</Typography> */}

            <Grid container spacing={2}>
                {/* <Grid item xs={12} md={3}>
                    <KenSelect
                        name="Activity Completion"
                        label=""
                        options={activityLists}
                        value={values.activityCompletion}
                        onChange={e => { setFieldValue('activityCompletion', e.target.value); }}
                        setFieldTouched={setFieldTouched}
                        errors={errors?.activityCompletion}
                        touched={touched?.activityCompletion} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <KenSelect
                        name="Activity Completion 2"
                        label=""
                        optionalLabel={false}
                        options={ActivityCompletion}
                        value={values.activityCompletion2}
                        onChange={e => { setFieldValue('activityCompletion2', e.target.value); }}
                        errors={errors?.activityCompletion2}
                        setFieldTouched={setFieldTouched}
                        touched={touched?.activityCompletion2}
                    />
                </Grid> */}
                <Grid item xs={12} md={10} spacing={2}>
                    <KenRadioGroup
                        label={t('RestricedAccess:Select_Restriction_Date')}
                        options={restrictionDateArr}
                        defaultValue={() => {
                            setFieldValue('restrictionDateOpt', restrictionDateArr[1].value);
                            return restrictionDateArr[1].value;
                        }}
                        onChange={handleChange}
                        setFieldTouched={setFieldTouched}
                        name="restrictionDateOpt"
                        value={values.restrictionDateOpt}
                        variant="outline"
                        errors={errors?.restrictionDateOpt}
                        touched={touched?.restrictionDateOpt}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.radioClass}>
                <Grid md={4} item >
                    <KenDateTimePicker
                        label=""
                        inputBaseRootClass={classes.dateInputBaseClass}
                        onChange={newValue => { setFieldValue('restrictionDate', newValue.target.value); }}
                        value={values.restrictionDate}
                        setFieldTouched={setFieldTouched}
                        name="restrictionDate"
                        variant="outline"
                        errors={errors?.restrictionDate}
                        touched={touched?.restrictionDate}
                    />
                </Grid>
            </Grid>

            <Grid xs={12} md={8} container spacing={2} className={classes.gradeLabelClass}>
                <Grid item xs={12} md={3}>
                    <KenSelect
                        name="Grade"
                        label={<span className={classes.inputBaseClass}>{t('RestricedAccess:Grade')}</span>}
                        optionalLabel={false}
                        options={Grade}
                        value={values.grade}
                        onChange={e => { setFieldValue('grade', e.target.value); }}
                        errors={errors?.grade}
                        touched={touched?.grade}
                        setFieldTouched={setFieldTouched}
                    />
                </Grid>
                <Grid sm={3} md={3} item className={classes.percentageField}>
                    <KenInputField
                        placeholder="--"
                        label={t("RestricedAccess:Must_Be_greaterEqualto")}
                        inputBaseRootClass={classes.inputClass}
                        value={values.mustGreaterEqualto}
                        setFieldTouched={setFieldTouched}
                        name="mustGreaterEqualto"
                        defaultValue={() => { setFieldValue('mustGreaterEqualto', 0) }}
                        onChange={newValue => { setFieldValue('mustGreaterEqualto', newValue.target.value); }}
                        errors={errors?.mustGreaterEqualto}
                        touched={touched?.mustGreaterEqualto}
                    />
                    <span className={classes.spanPercentage}>%</span>

                </Grid>
                <Grid sm={3} md={3} item className={classes.percentageField} >
                    <KenInputField
                        placeholder="--"
                        label={t("RestricedAccess:Must_Be_lessThan")}
                        inputBaseRootClass={classes.inputClass}
                        value={values.mustLessThan}
                        setFieldTouched={setFieldTouched}
                        name="mustLessThan"
                        defaultValue={() => { setFieldValue('mustLessThan', 0) }}
                        onChange={newValue => { setFieldValue('mustLessThan', newValue.target.value); }}
                        errors={errors?.mustLessThan}
                        touched={touched?.mustLessThan}
                    />
                    <span className={classes.spanPercentage}>%</span>
                </Grid>
            </Grid>

            {/* {values.userProfile.length ? values.userProfile.map((row, i) => {
                return <div key={row.id}>
                    <Typography className={classes.selectBoxLabel}>{t('RestricedAccess:User_Profile_Field')}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <KenSelect
                                name={`userProfile[${i}]['profileField1']`}
                                label=""
                                options={profileField1}
                                value={values.userProfile[i]['profileField1']}
                                onChange={change.bind(null, `userProfile[${i}]['profileField1']`)}
                                errors={errors.userProfile
                                    ? errors.userProfile[i]
                                        ? errors.userProfile[i]['profileField1']
                                        : null
                                    : null
                                }
                                setFieldTouched={setFieldTouched}
                                touched={touched.userProfile
                                    ? touched.userProfile[i]
                                        ? touched.userProfile[i]['profileField1']
                                        : null
                                    : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <KenSelect
                                name={`userProfile[${i}]['profileField2']`}
                                label=""
                                optionalLabel={false}
                                options={profileField2}
                                value={values.userProfile[i]['profileField2']}
                                onChange={change.bind(null, `userProfile[${i}]['profileField2']`)}
                                // onChange={e => { onUserProfileChange(i, e.target.value, `userProfile[${i}]['profileField2']`) }}4
                                errors={
                                    errors.userProfile
                                        ? errors.userProfile[i]
                                            ? errors.userProfile[i]['profileField2']
                                            : null
                                        : null
                                }
                                touched={touched.userProfile
                                    ? touched.userProfile[i]
                                        ? touched.userProfile[i]['profileField2']
                                        : null
                                    : null
                                }
                                setFieldTouched={setFieldTouched}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <KenInputField
                                placeholder="Type Something"
                                label=''
                                inputBaseRootClass={classes.inputClass}
                                value={values.userProfile[i]['typeSomething']}
                                name={`userProfile[${i}]['typeSomething']`}
                                // onChange={change.bind(null, `userProfile[${i}]['typeSomething']`)}
                                onChange={newValue => { setFieldValue(`userProfile[${i}]['typeSomething']`, newValue.target.value); }}
                                setFieldTouched={setFieldTouched}
                                errors={errors.userProfile ? errors.userProfile[i] ? errors.userProfile[i]['typeSomething'] : null : null}
                                touched={touched.userProfile ? touched.userProfile[i] ? touched.userProfile[i]['typeSomething'] : null : null}
                            />
                        </Grid>
                        {i !== 0 &&
                            <Button
                                dataTestid="add"
                                handleClick={() => handleDelete(row, i)}
                                // label={t('RestricedAccess:Add_Nested_Restrictions')}
                                startIcon={<RemoveCircleOutline fontSize="small" color="primary" />}
                            />}
                    </Grid>
                </div>
            }) : null} */}
            {/* <Grid item xs={12} className={classes.wrap}>
                <Box display={{ xs: 'block', md: 'flex' }} className={classes.wrapLink}>
                    <Button
                        dataTestid="add"
                        handleClick={handleAddNestedRestrictions}
                        label={t('RestricedAccess:Add_Nested_Restrictions')}
                        startIcon={<AddCircleOutlineIcon fontSize="small" color="primary" />}
                    />
                </Box>
            </Grid> */}

            {/* <KenDialog
                open={openDialog}
                handleClose={handleCancel}
                negativeButtonText={t('labels:Cancel')}
                negativeButtonClick={handleCancel}
                maxWidth="xs"
                title={
                    <Box className={classes.leftAligned}>
                        <Typography className={classes.popupHeader}>
                            {t('labels:Add_Restriction')}
                        </Typography>
                        <CloseIcon
                            fontSize="small"
                            onClick={handleCancel}
                            className={classes.pointer}
                        />
                    </Box>
                }
                titleStyle={classes.titleHead}
                dialogActions={false}
                cancelActionFlag={true}>
                <Box>
                    <Grid className={classes.gridBox}>
                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('activitycompletion')}>
                            {t("RestricedAccess:Activity_Completion")}
                        </KenButton>
                        <p className={classes.restText} >Require students to complete (or not complete) another activity.</p>
                    </Grid>
                    <Grid className={classes.gridBox}>

                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('date')}>Date</KenButton>
                        <p className={classes.restText}>Prevent access until (or from) a specified date and time.</p>
                    </Grid>
                    <Grid className={classes.gridBox}>
                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('grade')}>
                            {t("RestricedAccess:Grade")}
                        </KenButton>
                        <p className={classes.restText}>Require students to achieve a specified grade.</p>
                    </Grid>
                    <Grid className={classes.gridBox}>

                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('group')}>Group</KenButton>
                        <p className={classes.restText}>Allow only students who belong to a specified group, or all groups.</p>
                    </Grid>
                    <Grid className={classes.gridBox}>

                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('grouping')}>Grouping</KenButton>
                        <p className={classes.restText}>Allow only students who belong to a group within a specified grouping.</p>
                    </Grid>
                    <Grid className={classes.gridBox}>

                        <KenButton variant="primary" buttonClass={classes.buttonClass} onClick={() => onSelectRestriction('userprofile')}>User Profile</KenButton>
                        <p className={classes.restText}>Control access based on fields within the student's profile.</p>
                    </Grid>
                </Box>
            </KenDialog> */}
        </Box >
    );
}
