import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Typography, Avatar, Tooltip } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import KenAppBar from '../../../../global_components/KenHeader';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import KenButton from '../../../../global_components/KenButton';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import { Link } from 'react-router-dom';
import Routes from '../../../../utils/routes.json';
import KenDialogBox from '../../../../components/KenDialogBox/index';
import KenAutoComplete from '../../../../components/KenAutoComplete';
import KenInputField from '../../../../global_components/KenInputField/index';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import KenSelect from '../../../../components/KenSelect/index';
// import Hidden from '@material-ui/core/Hidden';
import { addQuestionsToQuiz, getQuizQuestions, } from '../../../../utils/ApiService';
import RecentCollaborations from '../../../Assessment/QuestionPage/Components/RecentCollaborations/index';
import AssignmentGlobalActions from './AssignmentGlobalActions';

import { Button } from '@material-ui/core'
import { BiError } from 'react-icons/bi';
import { FiArrowUp, FiArrowDown, FiUpload, FiCheck } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone'

const useStyles = makeStyles(theme => ({
    headWrap: {
        display: 'flex',
        alignItems: 'center',
    },
    assessmentTitle: {
        color: theme.palette.KenColors.primary,
        fontWeight: 600,
        fontSize: 18,
    },
    titleIcon: {
        color: theme.palette.KenColors.primary,
        marginLeft: 10,
        cursor: 'pointer',
    },
    headerIcons: {
        color: theme.palette.KenColors.primary,
        background: theme.palette.KenColors.neutral11,
        padding: 4,
        borderRadius: '50%',
        marginLeft: 10,
        cursor: 'pointer',
    },
    btnWrap: {
        marginRight: 16,
        textTransform: 'capitalize',
    },
    discardBtnWrap: {
        marginRight: 24,
    },
    upArrow: {
        border: `2px solid ${theme.palette.KenColors.kenWhite}`,
        borderRadius: '50%',
        height: 20,
        marginRight: 6,
        width: 20,
        color: theme.palette.KenColors.kenWhite,
        marginTop: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upArrowIcon: {
        fontSize: 16,
    },
    saveButton: {
        color: theme.palette.KenColors.kenWhite,
        fontSize: 14,
        textTransform: 'capitalize',
    },
    discardLabel: {
        color: theme.palette.KenColors.tertiaryRed502,
        fontSize: 14,
        textTransform: 'capitalize',
    },
    popupTitle: {
        fontSize: 12,
        color: theme.palette.KenColors.neutral400,
    },
    titleHead: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.KenColors.neutral900,
        paddingBottom: 0,
    },
    chipWrap: {
        border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
        padding: 8,
        marginTop: 24,
    },
    chipRoot: {
        borderRadius: 3,
        margin: 4,
        border: `1px solid${theme.palette.KenColors.assessmentBorder}`,
        background: theme.palette.KenColors.kenWhite,
    },
    dialogPaper: {
        height: 'auto',
        position: 'absolute',
        top: 45,
        width: '475px'
    },
    grey: {
        backgroundColor: theme.palette.KenColors.neutral100,
        left: 0,
        paddingLeft: 1,
        paddingBottom: 1
    },
    greyGroup: {
        backgroundColor: theme.palette.KenColors.neutral100,
        left: 10,
        paddingLeft: 1,
        paddingBottom: 1,
    },
    collaborationWrapper: {
        marginTop: 24
    },
    extraAvatar: {
        color: theme.palette.KenColors.neutral900,
        background: theme.palette.KenColors.kenWhite,
        border: '0.5px solid #bdbdbd',
        fontSize: 12,
    },
    remainAvatars: {
        listStyleType: 'none',
        background: theme.palette.KenColors.kenWhite,
        paddingLeft: 10,
        left: 10,
        top: 12,
        width: '180px',
        position: 'absolute',
        zIndex: 1,
        fontSize: 12,
        boxShadow: '0px 1px 18px rgb(16 30 115 / 6%)',
        borderRadius: 3

    },
    listItem: {
        padding: '0px 0px',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    avatarlabel: {
        fontSize: 12,
        marginLeft: 10
    },

    //Drag and drop ui
    dragDrop: {
        borderRadius: 3,
        marginBottom: 15,
        width: '60%',
        margin: '0 auto',
        marginTop: '30px',
        display: 'flex',
        height: '20vh',
        position: 'relative'
    },
    title: {
        fontWeight: 600,
        fontSize: 14,
        color: '#061938',
        width: '100%',
        paddingLeft: 10
    },
    browseButton: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        // color: '#092682',
        height: 36,
        background: '#FFFFFF',
        border: '0.6px solid #B3BAC5',
        borderRadius: 3,
        textTransform: 'unset'
    },
    supportText: {
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        color: '#505F79',
        width: '100%',
    },
    dragField: {
        cursor: 'pointer',
        '&:hover': { background: '#F1F5FF !important' }
    },
    downloadButton: {
        background: '#092682',
        border: '0.6px solid #092682',
        padding: '8px 12px',
        borderRadius: 3,
        fontSize: 12,
        marginBottom: 20
    },
    removeFileBtn: {
        background: '#FFFFFF',
        border: '1px solid #E3E3E3',
        padding: '8px 12px',
        color: '#EF4060',
        fontWeight: 'bold',
        borderRadius: 3,
        fontSize: 12,
        marginBottom: 20,
        marginRight: 20
    },
    helperText: {
        fontWeight: 400,
        fontSize: 13,
        textAlign: 'center',
        color: '#A8AFBC',
    },
    footer: {
        margin: 0,
        textAlign: 'center'
    },
    iconCss: {
        fontSize: 18,
        lineHeight: 1,
        paddingRight: 5,
        color: '#092682'
    },
    uploadIcon: {
        fontSize: 12,
        lineHeight: 1,
        color: "#997AFF",
        fontWeight: 600
    },
    uploadWrapper: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid #E1D8FF',
        background: '#E1D8FF',
        textAalign: 'center',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'center'
    },
    cancelIcon: {
        color: "#EF4060",
        width: 24,
        background: '#FFE9E7',
        height: 24,
        borderRadius: "50%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        cursor: 'pointer'
    },
    linearRoot: {
        borderRadius: 5,
        height: 10,
        color: "#52C15A",
        background: "#E3E3E3"
    },
    loadingTxt: {
        color: '#7A869A',
        fontSize: 16,
        marginTop: 10,
    },
    bar: {
        background: '#52C15A'
    },
    progressWrap: {
        display: 'flex',
        alignItems: 'center',
        height: 40,
        marginBottom: 30
    },
    uploadSuccess: {
        color: '#00B25D',
        fontSize: 14,
        background: '#CCE9E4',
        fontWeight: 'bold',
        borderRadius: '50%',
        textAlign: 'center',
        padding: 5
    },
    percentageTxt: {
        minWidth: 'max-content',
        paddingRight: 5
    },
    fileName: {
        fontWeight: 600,
        margin: '10px 0px',
        fontSize: 14,
        color: '#505F79'
    },
    fileSize: {
        color: '#A8AFBC',
        fontSize: 14,
        marginLeft: 12,
        fontWeight: 400
    },
    errorText: {
        fontSize: 12,
        color: '#F2564A',
        fontWeight: 600
    },
    dragTextBox: {
        display: 'flex',
        alignItems: 'center',
        textAlign: "left",
        width: '100%'
    },
    browseBox: {
        textAlign: 'right',
        width: '60%'
    }
}));
const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    border: '1px dashed #A8AFBC',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#092682',
    background: '#F1F5FF'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
export default function AssignmentFileUpload(props) {
    const classes = useStyles();

    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);
    const [inputBoxShow, setInputBoxShow] = React.useState(false);
    const [quizId, setQuizId] = useState(props?.history?.location?.state?.quizId);
    const [assignmentName, setAssignmentName] = useState(props?.history?.location?.state?.assignmentName);

    const [disabledSend, setDisabledSend] = React.useState(true)

    const [inputValue, setInputValue] = React.useState('Assignment');
    const [inviteText, setInviteText] = React.useState('Send Invite')
    const [invite, setInvite] = React.useState([])
    const [remainLength, setRemainLength] = React.useState(0)
    const [remainAvatars, setRemainAvatars] = React.useState([])
    const [showAvatarDropdown, setShowAvatarDropdown] = React.useState(false)
    const [arr, setArr] = React.useState([]);

    //Add All the questions from question bank to quiz

    const handleSubmit = async () => {
        // addAllQuestion2Quiz()
    };
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone();
    const [progress, setProgress] = React.useState(10);
    const [uploadStarted, setUploadStarted] = React.useState(false)
    const [statusTxt, setStatusTxt] = React.useState('Uploading...')
    const [fileName, setFileName] = React.useState('')
    const [fileSelected, setFileSelected] = React.useState('')
    const [fileSize, setFileSize] = React.useState('')
    const [removeProgress, setRemoveProgress] = React.useState(false)
    const [fileExtenstion, setFileExtenstion] = React.useState('')
    const [errorText, setErrorText] = React.useState('')

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);
    const getFileSize = (bytes) => {
        if (bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
            if (i === 0) return `${bytes} ${sizes[i]})`
            return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
        }
    }
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        setUploadStarted(true)
        setFileName(acceptedFiles[0].name)
        setFileSize(getFileSize(acceptedFiles[0].size))
        let extension = getExtenstion(acceptedFiles[0].name)
        setFileExtenstion(extension)
        setFileSelected(acceptedFiles)
        setTimeout(() => {
            setProgress(100)
            setStatusTxt('Uploaded')
        }, 2000);
        setTimeout(() => {
            setRemoveProgress(true)
        }, 3000);
    }
    //   useEffect(() => {
    //     getQuizQuestions(quizId).then(res => {
    //       setOriginalQuestionSet(res?.questions);
    //       if (!res.hasOwnProperty('errorcode')) {
    //         const selected = res?.questions?.map(item => {
    //           return {
    //             ...item,
    //             id: item.id,
    //             mark: item.mark,
    //             sectionId: item.sectionid,
    //             sectionName: item.section,
    //             page: item.page,
    //             questionid: item.id,
    //             questionname: item.name,
    //             questiontype: item.qtype,
    //             selected: true,
    //             text: item.questiontext,
    //           };
    //         });

    //         const unique = uniqueArrayObjects([...selectedQuestions, ...selected], 'questionid');
    //         setSelectedQuestions(unique);
    //         setTransaction(); //clear the middle panel
    //       } else {
    //         console.log('something went wrong');
    //       }
    //     });
    //   }, [quizUpdated]);

    const showInput = () => {
        setInputBoxShow(true);
    };

    const onBlur = () => {
        setInputBoxShow(false);
    };

    const updateInput = e => {
        setInputValue(e.target.value);
    };

    const eventHandler = () => {
        setInputBoxShow(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    // const handleCancel = () => {
    //     setOpen(false);
    // }
    return (
        <Box mt={2} data-testid="question-bank">
            <KenAppBar
                menuIcon={<Typography className={classes.titleIcon} onClick={() => { props.history.push('/assignment') }} ><ArrowBackOutlinedIcon /></Typography>}
                title={
                    <Box className={classes.headWrap}>
                        {inputBoxShow === true ? (
                            <Grid md={3}>
                                <KenInputField
                                    required
                                    onBlur={onBlur}
                                    value={assignmentName}
                                    endAdornment={<Box><DoneIcon /></Box>}
                                    onChange={updateInput}
                                    iconClickEvent={eventHandler}
                                />
                            </Grid>
                        ) : (<Typography className={classes.assessmentTitle}>{assignmentName}</Typography>)}

                        <Typography className={classes.titleIcon} onClick={showInput}><CreateOutlinedIcon /></Typography>

                        <Typography className={classes.headerIcons}><SettingsOutlinedIcon /></Typography>

                        <Typography className={classes.headerIcons} onClick={handleClickOpen}><PersonAddOutlinedIcon /></Typography>

                        {invite.length > 0 &&
                            <Box style={{ display: 'flex', marginLeft: 10 }}>
                                {<React.Fragment>
                                    {arr.slice(0, 5).map((item, i) => {
                                        return (<Avatar alt={item.label} className={classes.greyGroup}>
                                            {item?.label.charAt(0)}</Avatar>
                                        )
                                    })}
                                    {remainLength > 0 &&
                                        <React.Fragment>
                                            <div
                                                style={{ position: 'relative' }}
                                                onMouseOver={() => setShowAvatarDropdown(true)}
                                                onMouseLeave={() => setShowAvatarDropdown(false)}>
                                                <Avatar className={classes.extraAvatar}>{`+${remainLength}`}</Avatar>
                                                {showAvatarDropdown && remainLength > 0 &&
                                                    <ul className={classes.remainAvatars}>
                                                        {remainAvatars.map((item, i) => {
                                                            return (<li className={classes.listItem} key={i}>
                                                                <Avatar alt={item.label} className={classes.greyGroup} style={{ float: 'left', left: 0 }}>
                                                                    {item?.label.charAt(0)}</Avatar>
                                                                <p className={classes.avatarlabel}>{item.label}</p></li>)
                                                        })
                                                        }
                                                    </ul>}
                                            </div>
                                        </React.Fragment>
                                    }
                                </React.Fragment>}
                            </Box>}
                    </Box>}
            >

                <AssignmentGlobalActions handleSubmit={() => handleSubmit()} />
            </KenAppBar >

            <Box mt={2}>

                <div className={classes.dragDrop}>
                    <Typography style={{ position: 'absolute', top: -25, fontSize: '12px' }}>{t('labels:Add_File_Link')}</Typography>
                    <Dropzone onDrop={onDrop} accept=".doc,.xml,.docx" maxFiles={1}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ style })} className={classes.dragField}>
                                <input {...getInputProps()} />
                                <div className={classes.dragTextBox}>
                                    <div className={classes.uploadWrapper} title={"Upload File"}>
                                        <span className={classes.uploadIcon}>
                                            <FiUpload style={{ strokeWidth: '2px', fontSize: 18 }} /></span>
                                    </div>
                                    <p className={classes.title}>Drag & Drop file </p>
                                </div>
                                <div className={classes.browseBox}>
                                    <Button className={classes.browseButton} variant="outlined">
                                        <p style={{ color: '#A8AFBC' }}> <span className={classes.iconCss}><FiArrowUp /></span>
                                            Browse from <span style={{ color: '#092682' }}> Computer </span> or
                                            <span style={{ color: '#092682' }}> LMS </span>
                                        </p>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Dropzone>

                </div>
            </Box>

            {/* <KenDialogBox
                open={open}
                // handleClose={handleClose}
                handleCancel={handleCancel}
                handleSendInvite={handleSendInvite}
                // handleClickOpen={handleClickOpen}
                disabledSend={disabledSend}
                styleOverrides={{ dialogPaper: classes.dialogPaper }}
                title="INVITE TEACHERS"
                titleStyle={classes.titleHead}
                customButtonText={inviteText}
            >
                <Box>
                    <Typography className={classes.popupTitle}>{t('messages:select_upto_teachers_to_invite_and_collaborate_with_this_assignment')}</Typography>
                    {arr?.length > 0 && (
                        <Box className={classes.chipWrap}>
                            {arr.map(el => (
                                <Chip
                                    classes={{ root: classes.chipRoot, deleteIcon: classes.deleteChipIcon, }}
                                    avatar={
                                        <Grid><Avatar alt="user" className={classes.grey}>
                                            {el?.label.charAt(0)}</Avatar>
                                        </Grid>
                                    }
                                    label={el?.label}
                                    onDelete={handleDelete(el)}
                                    className={classes.chip}
                                />
                            ))}
                        </Box>
                    )}
                    <Box pt={3}>
                        <KenAutoComplete
                            options={posts}
                            placeholder="Search..."
                            setData={handleSelection}
                        />
                    </Box>
                    <Grid className={classes.collaborationWrapper}>
                        <RecentCollaborations posts={posts} onhandleAddItem={handleSelection} />
                    </Grid>
                </Box>
            </KenDialogBox> */}
        </Box >
    );
}
