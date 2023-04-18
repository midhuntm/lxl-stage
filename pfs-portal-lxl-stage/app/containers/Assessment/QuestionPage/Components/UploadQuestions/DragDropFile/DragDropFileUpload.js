import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone'
import { Box, makeStyles } from '@material-ui/core';
// drag drop file component
import { Button } from '@material-ui/core'
import { BiError } from 'react-icons/bi';
import { FiArrowUp, FiArrowDown, FiUpload, FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ExcelImage from '../../../../../../assets/excel-icon.svg'
import XMLImage from '../../../../../../assets/xml-icon.svg'

const useStyles = makeStyles(theme => ({
    dragDrop: {
        borderRadius: 3,
        marginBottom: 15,
        textAlign: 'center',

    },
    title: {
        fontWeight: 600,
        fontSize: 14,
        color: '#061938',
        width: '100%'
    },
    browseButton: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#092682',
        height: 36,
        background: '#FFFFFF',
        border: '0.6px solid #B3BAC5',
        borderRadius: 3
    },
    supportText: {
        fontWeight: 400,
        fontSize: 12,
        textAlign: 'center',
        color: '#505F79',
        width: '100%',
    },
    dragField: {
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
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
        paddingRight: 5
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
    }
}));

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

function LinearProgressWithLabel(props) {
    const classes = useStyles()
    return (
        <Box>
            {/* <p className={classes.fileName}>{props.fileName}</p> */}
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" classes={{ root: props.inputBaseRootClass, bar: props.bar }} {...props} />
                </Box>
                <Box minWidth={35}>
                    <div>
                        {props.value < 100 ? <span className={classes.cancelIcon}>X</span> :
                            <span className={classes.uploadSuccess}><FiCheck strokeWidth={'2px'} fontSize={18} /></span>
                        }
                    </div>

                </Box>
            </Box>
            <Box className={classes.progressWrap}>
                <Box width="100%">
                    <Typography variant="body2" className={classes.loadingTxt}>{props.status}</Typography>
                </Box>
                <Box minWidth={35} color="#52C15A" onClick={props.cancelUpload}>
                    <p className={classes.percentageTxt}>{props.value}%</p></Box>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
};

function DragDropFile(props) {
    // drag state
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
    const classes = useStyles()
    const downloadTemplate = () => {

    }
    const saveQuestions = () => {

    }
    const getFileSize = (bytes) => {
        if (bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
            if (i === 0) return `${bytes} ${sizes[i]})`
            return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
        }
    }
    const cancelUpload = () => {
        setUploadStarted(false)
    }
    const getExtenstion = (fileName) => {
        let arr = String(fileName).split('.')
        return arr[arr.length - 1]
    }
    return (
        <React.Fragment>
            {!uploadStarted ? <> <div className={classes.dragDrop}>
                <Dropzone onDrop={onDrop} accept=".doc,.xml,.docx" maxFiles={1}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ style })} className={classes.dragField}>
                            <input {...getInputProps()} />
                            <div className={classes.uploadWrapper} title={"Upload File"}><span className={classes.uploadIcon}><FiUpload style={{ strokeWidth: '2px', fontSize: 18 }} /></span></div>
                            <p className={classes.title}>Drag & Drop file to upload or</p>
                            <Button className={classes.browseButton} variant="outlined" color="secondary"><span className={classes.iconCss}><FiArrowUp /></span> Browse File</Button>
                            <p className={classes.supportText}>Supported Format .doc, .docx and .xml (upto 20 MB)</p>
                        </div>
                    )}
                </Dropzone>

            </div>
                <Box className={classes.footer}>
                    <p className={classes.helperText}>Download the template for different types of question
                        and edit/add questions accordingly before uploading the file.</p>

                    <Button variant="contained"
                        color="primary"
                        className={classes.downloadButton}
                        onClick={e => { downloadTemplate(e); }}>
                        <span className={classes.iconCss}><FiArrowDown /></span> Download template and edit them before uploading
                    </Button>
                </Box>
            </>
                :
                fileSelected.length &&
                (<React.Fragment>
                    <div style={{ textAlign: 'center' }}>
                        {String(fileExtenstion) == "docx" ? <img src={ExcelImage} style={{ width: '15%' }} />
                            : String(fileExtenstion) == "xml" && <img src={XMLImage} style={{ width: '15%' }} />}
                    </div>
                    <p className={classes.fileName}
                        style={{ textAlign: removeProgress ? 'center' : 'left' }}>{fileName}<span className={classes.fileSize}>{fileSize}</span>
                    </p>
                    {errorText && <p className={classes.errorText}><BiError fontSize={12} /> Uploading failed : File size is more than 20 MB</p>}
                    {!removeProgress &&
                        <LinearProgressWithLabel
                            fileSelected={fileSelected}
                            value={progress} fileName={fileName}
                            status={statusTxt}
                            cancelUpload={cancelUpload}
                            inputBaseRootClass={classes.linearRoot}
                            bar={classes.bar} />
                    }
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {removeProgress &&
                            <Button variant="outline"
                                className={classes.removeFileBtn}

                                onClick={e => { removeFile(e); }}>
                                Remove File
                            </Button>}
                        <Button variant="contained"
                            color="primary"
                            className={classes.downloadButton}
                            onClick={e => { saveQuestions(e); }}>
                            Save to Question list
                        </Button>
                    </Box>
                </React.Fragment>)

            }

        </React.Fragment >
    );
};
export default DragDropFile