import { makeStyles } from '@material-ui/core';
import React from 'react';
import KenDialogBox from '../../../../../components/KenDialogBox';
import DragDropFile from './DragDropFile/DragDropFileUpload';

const useStyles = makeStyles(theme => ({
    mobileDialog: {
        width:'35%',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
        },
    },
    uploadText:{
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '20px',
        textTransform: 'uppercase',
        color: '#061938',
        textAlign: 'center',
        marginBottom: 30
    }
}));

const UploadQuestionsModal = props => {

    const { open, onClose, } = props;
    const classes = useStyles();

    return (
        <div data-testid="questionbank-modal">
            <KenDialogBox
                open={open}
                handleClose={onClose}
                dialogActionFlag={false}
                maxWidth="35%"
                styleOverrides={{ dialogPaper: classes.mobileDialog }}
            >
                <p className={classes.uploadText}>Upload Questions</p>
                <DragDropFile />
            </KenDialogBox>
        </div>
    );
};

export default UploadQuestionsModal