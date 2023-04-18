// -------------------------------------------------------------------
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import KenEditor from '../../../global_components/KenEditor';
import KenInputField from '../../../components/KenInputField';

import KenButton from '../../../global_components/KenButton';
import FileSubmission from '../../Assignment/AssignmentReview/components/OriginalityReport/components/fileSubmission';
import { useHistory } from 'react-router-dom';
import KenSnackbar from '../../../components/KenSnackbar/index';
import { manualGradeEssayQuestiontype, postCoreFileUpload } from '../../../utils/ApiService';
import KenLoader from '../../../components/KenLoader';
import PDFAnnotateViewer from '../../Assignment/AssignmentReview/components/OriginalityReport/pdfAnnotateViewer';
// import moment from 'moment';
import parse from 'html-react-parser';
import KenChip from '../../../global_components/KenChip';


const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: 18,
        fontWeight: 600,
        color: theme.palette.KenColors.primary,
    },
    typoPlagiarism: {
        fontWeight: 600,
        fontSize: 14,
        color: theme.palette.KenColors.neutral400,
    },
    innerContainer: {
        background: theme.palette.KenColors.kenWhite,
    },
    labelText: {
        color: '#061938',
        fontSize: 12,
    },
    question: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '20px',
        // color: theme.palette.KenColors.neutral400,
        color: theme.palette.KenColors.kenBlack,
    },
    gradeBox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    perText: {
        width: '25%',
        paddingTop: 15,
        marginLeft: 10,
        fontSize: 14,
    },
    backListText: {
        background: '#092682',
        borderRadius: 3,
        padding: '8px 12px',
        color: '#FFFFFF',
        fontSize: 14,
    },
    redoBtn: {
        background: '#FFE9E7',
        borderRadius: 3,
        color: '#EF4060',
        fontSize: 12,
    },
    textMargin: {
        padding: 0,
        paddingLeft: 16
    },
    headText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    headingText: {
        color: theme.palette.KenColors.neutral900,
        fontWeight: '600',
    },
    inputField: {
        '&:invalid': {
            color: '#000'
        }
    }
}));

export default function AssessmentGrading(props) {
    // const { submittedUsers, submissionHeading, cmid, contactId, } = props?.history?.location?.state;
    const { cmid, questionData, closePopUp, fileLink, quizInfo, setRefreshData } = props;
    const [lmsToken, setLmstoken] = React.useState(localStorage.getItem('fileToken'));
    const classes = useStyles();
    const [previewData, setPreviewData] = React.useState({});

    const [fileUrl, setFileUrl] = React.useState(fileLink);
    const [file, setFile] = React.useState(true);
    const [onlineTest, setOnlineTest] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [onlineTestContent, setOnlineTestContent] = React.useState('');
    const [onlineDesc, setOnlineDesc] = React.useState('');
    const [marks, setMarks] = React.useState('');
    const [comments, setComments] = React.useState('');

    const [reviewPlugin, setReviewPlugin] = React.useState([]);
    // const [reviewPlugin, setReviewPlugin] = React.useState(submissionRes?.lastattempt?.submission?.plugins)
    const history = useHistory();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [handleActionClick, setHandleActionClick] = React.useState(false);
    const [maxGrade, setMaxGrade] = React.useState(questionData?.mark);
    const [isEdited, setIsEdited] = React.useState(false);
    const [annotatedPDFData, setAnnotatedPDFData] = React.useState('');

    useEffect(() => {
        console.log(questionData)
        if (questionData?.status == "mangrpartial") {
            setMarks(parseFloat(questionData?.markobtained))
        }
    }, [])

    const handleGrade = e => {
        let val = e.target.value;
        if (val <= maxGrade) {
            setMarks(parseFloat(e.target.value));
            setIsEdited(true);
        } else {
            // alert(`Grade should not be greater than ${maxGrade}`);
            handleSnackbarOpen('Warning', `Grade should not be greater than ${maxGrade}`)
            setIsEdited(false);
        }
    };

    const onBackList = () => {
        closePopUp()

    }
    const handleSnackbarOpen = (severity, message) => {
        setOpenSnackbar(true);
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
    };
    const assessmentGrading = async () => {
        setLoading(true);
        // let fileSplitArr = fileUrl.split('?')[0].split('/')
        // let fileName = fileSplitArr[fileSplitArr.length - 1]

        // let fileUploadPayload = {
        //     contextid: '0',
        //     component: 'user',
        //     filearea: 'draft',
        //     itemid: '0',
        //     filepath: '/',
        //     filename: 'Annotated_' + `${fileName}`,
        //     filecontent: annotatedPDFData,
        //     contextlevel: 'user',
        //     instanceid: '2',
        // };

        // await postCoreFileUpload(fileUploadPayload)
        //     .then(uploadFileResponse => {
        //         if (uploadFileResponse?.itemid) {
        const payload = {
            mark: Number(marks).toFixed(0),
            questionid: String(questionData?.questionid),
            attemptid: Number(questionData?.attemptId),
            // comment: comments + ' Url:' + `${uploadFileResponse?.url}`,
            comment: comments,
        };
        console.log('manual grading payload', payload)
        manualGradeEssayQuestiontype(payload)
            .then(res => {
                setLoading(false);
                if (res?.errorcode == "codingerror") {
                    handleSnackbarOpen('error', 'Error:Something went wrong...!');
                    setTimeout(() => {
                        closePopUp()
                        setRefreshData(true)
                        console.log(' grading assessment', res);
                    }, 2000);
                }
                else {
                    handleSnackbarOpen('success', 'Assessment grading successful...!');
                    closePopUp()
                    setRefreshData(true)
                    console.log(' grading assessment', res);
                }
            }).catch(err => {
                setLoading(false);
                handleSnackbarOpen('error', 'Error:Something went wrong...!');
                setTimeout(() => {
                    closePopUp()
                    setRefreshData(true)
                    console.log('error in grading assessment', err);

                }, 2000);

            });
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    // const getAnnotatedData = React.useCallback(
    //     data => {
    //         if (data) {
    //             setAnnotatedPDFData(data?.data?.pdfData);
    //             setIsEdited(true);
    //         }
    //     },
    //     [fileUrl]
    // );

    return (
        <React.Fragment>
            <div>
                {loading && <KenLoader />}
                <Box m={1}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography className={classes.headingText}>
                                {quizInfo?.quiz}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container>
                        <Grid item md={9}>
                            <Typography variant="body1">
                                <KenChip label={"Essay"} style={{ backgroundColor: '#DFE8FF', padding: 16, marginLeft: 16, marginBottom: 16 }} />
                            </Typography>
                            <Box className={classes.textMargin}>
                                <Typography variant="body1" className={classes.headText}>Question:</Typography>
                            </Box>
                            <Box p={2} display="flex" alignItems="center" >
                                <Grid item xs={12} md={12} sm={12}>
                                    <Typography className={classes.question}>{parse(`${questionData?.questiontext}`)}</Typography>
                                    {/* <Grid item xs={12} md={12} sm={12}>
                                        {questionInfo?.mediaFile &&
                                            <Box style={{ width: '100%' }}>
                                                <img className={classes.mediaFile} title="Click on the image to enlarge/view details" onClick={() => {
                                                    window.open(questionInfo?.mediaFile)
                                                }}
                                                    src={questionInfo?.mediaFile} />
                                            </Box>
                                        }
                                    </Grid> */}
                                </Grid>
                            </Box>
                            <Box p={2}>
                                <KenEditor
                                    placeholder="Answer by the student"
                                    // label={<span className={classes.question}>{parse(questionData?.questiontext)}</span>}
                                    label={""}
                                    value={questionData?.userresponse}
                                    content={questionData?.userresponse}
                                    disabled={true}
                                    editorHeight="auto"
                                />
                            </Box>
                            {file &&
                                <React.Fragment>
                                    <Box className={classes.textMargin}>
                                        <Typography variant="body1" className={classes.headText}>Attachment:</Typography>
                                    </Box>
                                    <Box p={2} className={classes.innerContainer}>
                                        {/* <PDFAnnotateViewer
                                    file={file}
                                    getAnnotatedData={getAnnotatedData}
                                    fileUrl={fileUrl}
                                /> */}
                                        {fileUrl && <iframe
                                            src={fileUrl}
                                            width="100%"
                                            style={{ width: '100%', height: '100vh' }}
                                            frameBorder="0"
                                        />
                                        }
                                    </Box>
                                </React.Fragment>
                            }
                        </Grid>
                        <Grid p={2} item md={3}>
                            <Box p={2} className={classes.innerContainer}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Grid className={classes.gradeBox}>
                                            <KenInputField
                                                name="marks"
                                                label={<span className={classes.labelText}>Grade</span>}
                                                placeholder=""
                                                value={marks}
                                                type="number"
                                                inputBaseClass={classes.inputField}
                                                onChange={handleGrade}
                                            />
                                            <p className={classes.perText}>/{questionData?.mark}</p>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <KenEditor
                                            placeholder="Write some comments for the answer"
                                            label={<span className={classes.labelText}>Feedback</span>}
                                            value={comments}
                                            content={comments}
                                            handleChange={e => {
                                                setComments(e);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <KenButton buttonClass={classes.redoBtn} onClick={onBackList}>Cancel</KenButton>
                                        <KenButton variant={'primary'} className={classes.backListText} onClick={assessmentGrading}
                                            disabled={!isEdited}
                                        >Grade</KenButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </div>
            <KenSnackbar
                message={snackbarMessage}
                severity={snackbarSeverity}
                autoHideDuration={5000}
                open={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                position="Top-Right"
            />
        </React.Fragment>
    )
}