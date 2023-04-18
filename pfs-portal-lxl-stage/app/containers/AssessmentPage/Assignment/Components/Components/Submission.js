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
        marginBottom: 10
    },
    endQuiz: {
        [theme.breakpoints.only('xs')]: {
            marginTop: 8,
        },
        marginLeft: 20
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
        borderRadius: 3
    },
    gradeContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    minutesPos: {
        position: 'absolute',
        top: -14,
        width: '100%',
        left: 0
    }
}));


const Submission = (props) => {
    const { values, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;
    const [onlineText, setOnlineText] = React.useState(false)
    const [fileSubmission, setFileSubmission] = React.useState(true)


    const classes = useStyles();
    const { t } = useTranslation();

    const change = (name, e, index) => {
        e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);

    };
    const onHandleSubmissionType = (event, checked) => {
        let field = event.target.name
        setFieldValue(field, checked)
        if (field == "fileSubmission") {
            setFileSubmission(checked)
        }
        else if (field == "onlineText") {
            setOnlineText(checked)
        }
    }
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    const onHandleFileformat = (event, e, i) => {

        let filesFormat = values.fileFormatLists
        filesFormat.map(item => {
            if (item.type == event.target.name) {
                item['value'] = e
            }
            return item
        })
        setFieldValue('fileFormatLists', filesFormat)
    }
    return (
        <React.Fragment>
            <Box className={classes.container} mt={2}>
                <Typography className={classes.header}>{t('labels:Submission_settings')}</Typography>

                <Grid md={8} container item className={classes.boxMargin}>
                    <Typography className={classes.gradeLabel}>{t("labels:Submission_types")}</Typography>
                    <Grid md={12} container>
                        <Grid md={3} item >
                            <KenCheckBox
                                // disabled={values.disabled}
                                label={t('labels:Online_Text')}
                                value={values.onlineText}
                                name="onlineText"
                                onChange={onHandleSubmissionType}
                            />
                        </Grid>
                        <Grid md={3} item >
                            <KenCheckBox
                                // disabled={values.disabled}
                                label={t('labels:File_submission')}
                                value={values.fileSubmission}
                                name="fileSubmission"
                                onChange={onHandleSubmissionType}
                            />
                        </Grid>

                    </Grid>
                </Grid>
                {onlineText && // Word limit
                    <Grid sm={3} md={3}>
                        <KenInputField
                            placeholder=""
                            type="number"
                            label={t("labels:Word_Limit")}
                            inputBaseRootClass={classes.inputClass}
                            value={values.wordLimit}
                            setFieldTouched={setFieldTouched}
                            name="wordLimit"
                            defaultValue={() => { setFieldValue('wordLimit', 0) }}
                            onChange={newValue => { setFieldValue('wordLimit', newValue.target.value); }}
                            errors={errors?.wordLimit}
                            touched={touched?.wordLimit}
                        />
                    </Grid>
                }
                {fileSubmission &&
                    <React.Fragment>
                        <Grid container item md={9} style={{ marginTop: 16 }}>
                            <Grid sm={6} md={4}>
                                <KenInputField
                                    placeholder=""
                                    type="number"
                                    label={t("labels:no_of_filesupload")}
                                    inputBaseRootClass={classes.inputClass}
                                    value={values.noOfFilesUpload}
                                    setFieldTouched={setFieldTouched}
                                    name="noOfFilesUpload"
                                    defaultValue={() => { setFieldValue('noOfFilesUpload', 0) }}
                                    onChange={newValue => { setFieldValue('noOfFilesUpload', newValue.target.value); }}
                                    errors={errors?.noOfFilesUpload}
                                    touched={touched?.noOfFilesUpload}
                                />
                            </Grid>
                            <Grid sm={6} md={4} style={{ marginLeft: 10 }}>
                                <KenSelect
                                    label={t("labels:Maximum_submission_size")}
                                    inputBaseRootClass={classes.inputBaseClass}
                                    options={dropdownData.fileSize}
                                    onChange={newValue => { setFieldValue('maximumFileSize', newValue.target.value); }}
                                    value={values.maximumFileSize}
                                    defaultValue={newValue => { setFieldValue('maximumFileSize', dropdownData.fileSize[0].value) }}
                                    setFieldTouched={setFieldTouched}
                                    name="maximumFileSize"
                                    variant="outline"
                                    errors={errors?.maximumFileSize}
                                    touched={touched?.maximumFileSize}
                                />

                            </Grid>
                        </Grid>
                        <Grid style={{ marginTop: 16 }} >
                            <Typography className={classes.gradeLabel}>{t("labels:Submission_File_Format")}</Typography>
                            <Grid md={12} container item >

                                {values.fileFormatLists.map((item, i) => {
                                    return (
                                        <Grid md={4} item >
                                            <KenCheckBox
                                                label={values.fileFormatLists[i].label}
                                                value={values.fileFormatLists[i].value}
                                                name={values.fileFormatLists[i].type}
                                                onChange={onHandleFileformat}
                                            />
                                        </Grid>
                                    )
                                })} </Grid>
                        </Grid>
                    </React.Fragment>

                }
            </Box>

            {/* Submission Type
            Online Text
            File submission
            Number of file to upload
            Maximum submission size
            1
            Select
            Submission file format
            Bitmap Image File (.bmp)
            Microsoft Excel Document (.xls)
            PowerPoint Presentation (.ppt)
            JPEG Image (.jpeg)
            Microsoft Word Open XML Document (.docx)
            Plain Text File (.txt)
            JPEG Image (.jpg)
            Microsoft Word Document (.doc)
            Rich Text Format (.rtf) */}
        </React.Fragment>
    )

}
export default Submission