import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import KenInputField from '../../../../../components/KenInputField';
// import KenSelect from '../../../../../components/KenSelect';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenCheckbox from '../../../../../global_components/KenCheckbox/index';

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
    wrapLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 30
    },
}));

export default function SafeExamBrowser(props) {
    const { values, touched, errors, setFieldTouched, setFieldValue } = props;
    const [sebOption, setSebOption] = useState('0')
    const [seb2Lists, setSeb2Lists] = useState(AssessmentData.SafeExamBrowser)

    console.log(values, 'vl');

    const classes = useStyles();

    const { t } = useTranslation();

    const SEBrowserUseArr = [
        {
            label: 'No',
            value: "0",
        },
        {
            label: 'Yes, Configure manually',
            value: "1",
        },
        {
            label: 'Yes, Upload my own configuration',
            value: "2"
        },
        {
            label: 'Yes, Use SEB client configuration',
            value: "3"
        }
    ];
    const showQuizAttemptsArr = [
        {
            label: 'No',
            value: 0
        },
        {
            label: 'Yes',
            value: 1
        },
    ]
    const handleChange = (value) => {
        setFieldValue('safeExamBrowserUse', value);
        setSebOption(value)
    };
    const handleChangeQuizAttempts = e => {
        setFieldValue('seb_showsebdownloadlink', e.target.checked)
    }
    const change = (name, e, index) => {
        e.persist();
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    }
    const handleSEBItemList = (e, item) => {
        setFieldValue(item.valueName, e.target.checked);
    }
    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:SafeExamBrowser')}</Typography>
            <Grid container spacing={2}>
                <Grid md={10} item >
                    <KenRadioGroup
                        label={t('labels:Require_the_use_of_SafeExamBrowser')}
                        options={SEBrowserUseArr}
                        defaultValue={() => {
                            setFieldValue('safeExamBrowserUse', SEBrowserUseArr[0].value);
                            return SEBrowserUseArr[0].value;
                        }}
                        onChange={handleChange}
                        setFieldTouched={setFieldTouched}
                        name="safeExamBrowserUse"
                        value={values.safeExamBrowserUse}
                        variant="outline"
                        errors={errors?.safeExamBrowserUse}
                        touched={touched?.safeExamBrowserUse}
                    />
                </Grid>
            </Grid>
            {sebOption == '1' &&
                <> <Grid md={4} item style={{ marginBottom: 15 }}>
                    <KenInputField
                        type="password"
                        label={t("labels:Quit_Password")}
                        placeholder="enter quit password"
                        value={values.seb_quitpassword}
                        setFieldTouched={setFieldTouched}
                        name="seb_quitpassword"
                        onChange={change.bind(null, 'seb_quitpassword')}
                        errors={errors?.seb_quitpassword}
                        touched={touched?.seb_quitpassword}
                    />
                </Grid>
                    <Grid md={6} item style={{ marginBottom: 15 }}>
                        <KenInputField
                            type="password"
                            label={t("labels:seb_linkquitseb")}
                            placeholder=""
                            value={values.seb_linkquitseb}
                            setFieldTouched={setFieldTouched}
                            name="seb_linkquitseb"
                            onChange={change.bind(null, 'seb_linkquitseb')}
                            errors={errors?.seb_linkquitseb}
                            touched={touched?.seb_linkquitseb}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        {seb2Lists.map((ele, i) => {
                            return (<Grid md={8} item key={i} className={classes.wrapLink}>
                                <KenCheckbox
                                    label={ele.label}
                                    value={values.valueName}
                                    name={ele.valueName}
                                    onChange={(e) => handleSEBItemList(e, ele)}
                                />
                            </Grid>)
                        })}

                    </Grid>
                </>}
            {/* {sebOption == 2 &&
                <Grid md={4} item>
                    <KenInputField
                        label={t('labels:Browser_Exam_Keys')}
                        placeholder="enter browser exam keys"
                        value={values.seb_allowedbrowserexamkeys}
                        setFieldTouched={setFieldTouched}
                        name="seb_allowedbrowserexamkeys"
                        onChange={change.bind(null, 'seb_allowedbrowserexamkeys')}
                        errors={errors?.seb_allowedbrowserexamkeys}
                        touched={touched?.seb_allowedbrowserexamkeys}
                    />
                </Grid>
            } */}
            {(sebOption == '2' || sebOption == '3') &&
                <Grid container spacing={2}>
                    <Grid md={10} item >
                        {/* <KenRadioGroup
                            label={t('labels:seb_showsebdownloadlink')}
                            options={showQuizAttemptsArr}
                            defaultValue={() => {
                                setFieldValue('seb_showsebdownloadlink', showQuizAttemptsArr[0].value);
                                return showQuizAttemptsArr[0].value;
                            }}
                            onChange={handleChangeQuizAttempts}
                            setFieldTouched={setFieldTouched}
                            name="seb_showsebdownloadlink"
                            value={values.seb_showsebdownloadlink}
                            variant="outline"
                            errors={errors?.seb_showsebdownloadlink}
                            touched={touched?.seb_showsebdownloadlink}
                        /> */}
                        <KenCheckbox
                            label={t('labels:seb_showsebdownloadlink')}
                            value={values.seb_showsebdownloadlink}
                            name="seb_showsebdownloadlink"
                            onChange={(e) => handleChangeQuizAttempts(e)}
                        />
                    </Grid>

                    <Grid md={4} item>
                        <KenInputField
                            label={t('labels:Browser_Exam_Keys')}
                            placeholder="enter browser exam keys"
                            value={values.seb_allowedbrowserexamkeys}
                            setFieldTouched={setFieldTouched}
                            name="seb_allowedbrowserexamkeys"
                            onChange={change.bind(null, 'seb_allowedbrowserexamkeys')}
                            errors={errors?.seb_allowedbrowserexamkeys}
                            touched={touched?.seb_allowedbrowserexamkeys}
                        />
                    </Grid>
                </Grid>
            }

        </Box >
    );
}
