import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
// import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenSelect from '../../../../../components/KenSelect';
// import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
// import KenInputField from '../../../../../components/KenInputField/index';
import KenInputField from '../../../../../components/KenInputField/index';
import { useTranslation } from 'react-i18next';
import dropdownData from '../../forumDetails.json';
import moment from 'moment';

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
        marginBottom: 0,
    },
    boxMargin: {
        marginBottom: 10,
    },
    inputBaseClass: {
        background: theme.palette.KenColors.kenWhite,
    },
    inputClass: {
        background: theme.palette.KenColors.kenWhite,
    },

}));

export default function ThresholdBlocking(props) {
    const { values, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;
    console.log('values ', values);
    const [blockingTimePeriod, setBlockingTimePeriod] = React.useState(dropdownData.blockingTimePeriod)
    // const [showBlocksField, setShowBlocksField] = React.useState(false)

    const classes = useStyles();
    const { t } = useTranslation();
    const change = (name, e, index) => {
        e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    }
    const onChangeBlockPeriod = (newValue) => {
        setFieldValue('blockperiod', newValue.target.value);

        let val = newValue.target.value;
        if (val !== 0) {
            setFieldValue('showBlocksField', true)
            // setShowBlocksField(true)
        }
        else {
            // setShowBlocksField(false)
            setFieldValue('showBlocksField', false)
        }
    }

    return (
        <Box className={classes.container} mt={2}>
            <Typography className={classes.header}>{t('labels:Post_Threshold_For_Blocking')}</Typography>
            <Grid sm={6} md={4} className={classes.boxMargin}>
                <KenSelect
                    label={t('labels:block_Period')}
                    inputBaseRootClass={classes.inputBaseClass}
                    options={blockingTimePeriod}
                    value={values.blockperiod}
                    onChange={onChangeBlockPeriod}
                    setFieldTouched={setFieldTouched}
                    name="blockperiod"
                    variant="outline"
                    errors={errors?.blockperiod}
                    touched={touched?.blockperiod}
                />
            </Grid>
            {values.showBlocksField &&
                <React.Fragment>
                    <Grid xs={12} md={4} className={classes.boxMargin}>
                        <KenInputField
                            required
                            label={t('labels:block_After')}
                            placeholder=""
                            value={values.blockafter}
                            name="blockafter"
                            onChange={change.bind(null, 'blockafter')}
                            errors={errors?.blockafter}
                            setFieldTouched={setFieldTouched}
                            touched={touched?.blockafter}
                        />
                    </Grid>
                    <Grid xs={12} md={4} className={classes.boxMargin}>
                        <KenInputField
                            required
                            label={t('labels:block_Warn')}
                            placeholder=""
                            value={values.warnafter}
                            name="warnafter"
                            onChange={change.bind(null, 'warnafter')}
                            errors={errors?.warnafter}
                            setFieldTouched={setFieldTouched}
                            touched={touched?.warnafter}
                        />
                    </Grid>
                </React.Fragment>
            }
        </Box >
    );
}
