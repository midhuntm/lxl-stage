import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
// import KenRadioGroup from '../../../../../global_components/KenRadioGroup/index';
import KenSelect from '../../../../../components/KenSelect';
import KenDateTimePicker from '../../../../../global_components/KenDateTimePicker/index';
// import KenTimePicker from '../../../../../global_components/KenTimePicker/index';
// import KenInputField from '../../../../../components/KenInputField/index';
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

export default function Attachments(props) {
    const { values, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;
    console.log('values ', values);
    const [maxAttachments, setMaxAttachments] = React.useState(dropdownData?.maxAttachments)

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        // <Grid className={classes.timeContainer} xs={12} md={12}>
        <Box className={classes.container} mt={2}>
            <Grid container item md={9} xs={12} className={classes.boxMargin}>
                <Typography className={classes.header}>{t('labels:Attachments')}</Typography>
                <Grid container className={classes.wrap}>
                    <Grid item sm={6} md={4}>
                        <KenSelect
                            label={t('labels:Max_No_of_Attachments')}
                            inputBaseRootClass={classes.inputBaseClass}
                            options={maxAttachments}
                            value={values.maxattachments}
                            onChange={newValue => { setFieldValue('maxattachments', newValue.target.value); }}
                            // defaultValue={() => { setFieldValue('maxattachments', maxattachmentss[0].value); }}
                            setFieldTouched={setFieldTouched}
                            name="maxattachments"
                            variant="outline"
                            errors={errors?.maxattachments}
                            touched={touched?.maxattachments}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
