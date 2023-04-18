import { Box, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import KenChip from '../../../global_components/KenChip';
import parse from 'html-react-parser';
import KenEditor from '../../../global_components/KenEditor';
import KenInputField from '../../../components/KenInputField';
import KenButton from '../../../global_components/KenButton';
import AssessmentGrading from './AssessmentGrading';
// import KenPopover from '../../../components/KenPopover';
import KenDialog from '../../../global_components/KenDialog';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    marks: {
        marginLeft: '5px',
        fontWeight: 'bold',
    },
    container: {
        border: '1px solid #DFE1E6',
    },
    text: {
        fontSize: '12px',
    },
    questionTypoText: {
        display: 'flex',
        alignItems: 'flex-start',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '20px',
        color: theme.palette.KenColors.neutral400,
    },
    labelText: {
        color: '#061938',
        fontSize: 12,
    },
    gradeBox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    downloadUrl: {
        fontSize: 14,
        fontWeight: 400,
        textDecoration: 'underline'
    },
    leftAligned: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    pointer: {
        cursor: 'pointer',
    },
    popupHeader: {
        fontWeight: 'bold',
        fontSize: 18
    },
    popup: {
        height: '100vh'
    },
    // mediaFile: {
    //     width: 400,
    //     marginBottom: 15
    // }
}));

export default function ManualGradingOfSubjectiveQuestion(props) {
    const {
        questionNumber,
        questionText,
        questionType,
        question,
        marksObtained,
        answer,
        maxMarks,
        url,
        questionData,
        quizInfo,
        setRefreshData
    } = props;
    const classes = useStyles();

    const [fileToken, setFileToken] = useState(localStorage.getItem('fileToken'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'apps-popover' : undefined;


    const DoManualGrading = () => {
        // setAnchorEl(true);
        setOpenDialog(true);

        // alert('Graded successfully...')
    }
    const handleClose = () => {
        setOpenDialog(false);
    };
    return (
        <Box p={2} className={classes.container}>

            <Box display="flex" alignItems="center" justifyContent={"space-between"} >
                <Typography variant="body1">
                    <KenChip label={questionType} style={{ backgroundColor: '#DFE8FF' }} />
                </Typography>
                <Typography variant="body1" className={classes.marks}>
                    {`Maximum Marks: ${maxMarks}`} |  {`Obtained Marks: ${marksObtained}`}
                </Typography>

            </Box>
            <Box display="flex" alignItems="center" >
                <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.questionTypoText}>
                        <p className={classes.questionTypoText}
                            style={{ minWidth: 'max-content', paddingRight: 5 }}>{questionNumber}.</p>
                        <div>
                            {parse(question)}
                        </div>
                    </div>
                </Grid>
            </Box>
            <Box display="flex" alignItems="center" >
                <Grid item xs={12} sm={12} md={12}>
                    <KenEditor
                        // label={t('labels:Assessments_Descriptions')}
                        label={""}
                        required={true}
                        content={answer}
                        disabled={true}
                        setFieldTouched={true}
                        editorHeight="auto"
                    />
                </Grid>
            </Box>
            {url && <Box display="flex" alignItems="center" >
                <Typography variant="body1" className={classes.marks}>
                    <Link href={url + `?token=${fileToken}`} download target="_blank" className={classes.downloadUrl}> Click here to download the attachment</Link>
                </Typography>
            </Box>
            }


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Typography variant="body1" align='right'>
                    <Typography variant="paragraph" style={{ fontSize: 14 }} >Grading status:</Typography>
                    <KenChip
                        label={questionData?.status == "mangrpartial" ? "Partially Graded" :
                            (questionData?.status == "needsgrading" ? "Not Graded" : 'Graded')}
                        style={{
                            backgroundColor: questionData?.status == "mangrpartial" ? "#DFE8FF"
                                : (questionData?.status == "needsgrading" ? "#FF0000" : '#008000'),
                            color: questionData?.status == "mangrpartial" ? "#000"
                                : (questionData?.status == "needsgrading" ? "#FFF" : '#FFF'),
                        }}
                    />
                </Typography>
                <KenButton variant={'primary'} className={classes.backListText} onClick={DoManualGrading}>
                    {questionData?.status == "mangrpartial" ? 'Edit Grade' : 'Grade'}
                </KenButton>
            </Box>
            <br />
            <KenDialog
                open={openDialog}
                handleClose={handleClose}
                negativeButtonClick={handleClose}
                maxWidth="100%"
                title={
                    <Box className={classes.leftAligned}>
                        <Typography className={classes.popupHeader}>Assessment Grading</Typography>
                        <CloseIcon fontSize="small" onClick={handleClose} className={classes.pointer} />
                    </Box>
                }
                titleStyle={classes.titleHead}
                dialogActions={false}
            // fullScreen
            >
                <AssessmentGrading
                    questionData={questionData}
                    closePopUp={handleClose}
                    fileLink={url + `?token=${fileToken}`}
                    quizInfo={quizInfo}
                    setRefreshData={setRefreshData}
                />
            </KenDialog>
        </Box >
    );
}
