import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import KenInputField from '../../../../components/KenInputField/index';
import KenButton from '../../../../global_components/KenButton';
import KenLoader from '../../../../components/KenLoader/index';
import './style.scss';
const useStyles = makeStyles(theme => ({
    addedQuestionHeader: {
        padding: 16,
    },
    questionLabel: {
        color: theme.palette.KenColors.neutral900,
        width: '100%',
        borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
        paddingBottom: 5,
        marginBottom: 10
    },
    questionContent: {
        marginLeft: 3
    },
    selectOptionBar: {
        width: '50%',
        float: 'left',
        marginRight: '20px',
    },
    form: {
        position: 'relative',
    },
    SubmitHead: {
        marginTop: '2px',
    },
    SubmitBtn: {
        float: 'right',
        marginTop: '20px',
    }
}));
export default function CaseForm(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        values,
        touched,
        errors,
        handleChange,
        setFieldTouched,
        setFieldValue,
        handleSubmit,
        cancelItem,
    } = props;
    console.log("values", values)
    const change = (name, e, index) => {
        e.persist();
        handleChange(e);
        setFieldValue(name, e.target.value);
        setFieldTouched(name, true, false);
    };
    return (
        <Box data-testid="question-detail">
            {values.loading ? <KenLoader /> : null}
            <Grid
                container
                alignItems="center"
                justify="space-between"
                className={classes.addedQuestionHeader}>
                <Box item className={classes.questionLabel}>
                    <Typography container>
                        <span className={classes.questionContent}>{props.selectedCase}</span>
                    </Typography>
                </Box>
                {props.selectedCase === "Contact"?
                 <>
                <Grid className={classes.questionContent}>
                    <Box  className={classes.questionContent}>
                        <h2>ALLIANCE UNIVERSITY EPGDM DEPARTMENT</h2>
                        <p>19TH CROSS, 7TH MAIN, BTM 2ND STAGE,
                        N S PALYA, BANGALORE – 560076</p>

                        <p>TEL: +91 80 26786020 / 21, 26789749</p>

                        <p>Timings: Monday to Saturday: 10:00 am to 4:00 pm (closed on public holidays)</p>
                        </Box>
                </Grid>
                </>
                :
                    <Grid sm={12} x={12}>
                    <form onSubmit={values.handleChange} className={classes.form} class="caseform" >
                    <div className='formCaseWrap'>
                        
                        <Box className={classes.classDisplayOne}>
                        <KenInputField
                                required
                                rows={1}
                                label="Query Type"
                                name="QueryType"
                                value={props.serviceType}
                                disabled={true}
                                // onChange={change.bind(null, 'Subject')}
                                errors={errors?.Subject}
                                setFieldTouched={setFieldTouched}
                                touched={touched?.Subject}
                            />
                            <KenInputField
                                required
                                rows={1}
                                label="Subject"
                                name="Subject"
                                value={values.Subject}
                                onChange={change.bind(null, 'Subject')}
                                errors={errors?.Subject}
                                setFieldTouched={setFieldTouched}
                                touched={touched?.Subject}
                            />
                        </Box>
                        <KenInputField
                            multiline
                            required
                            rows={3}
                            label="Description"
                            placeholder="Type your description here..."
                            name="Description"
                            value={values.Description}
                            onChange={change.bind(null, 'Description')}
                            errors={errors?.Description}
                            setFieldTouched={setFieldTouched}
                            touched={touched?.Description}
                        />
                        <Box className={classes.SubmitHead}></Box>
                        <Box className={classes.SubmitBtn}>
                            <KenButton
                                variant="secondary"
                                onClick={cancelItem}
                                label={t('labels:Cancel')}
                            /> &nbsp;
                            <KenButton
                                variant="primary"
                                onClick={handleSubmit}
                                label={t('labels:Submit')}
                            />
                        </Box>
                        </div>
                    </form>
                </Grid>
                }
                
            </Grid>
        </Box>
    );
}