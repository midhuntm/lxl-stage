import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function KenSnackBar(props) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    const { message, severity, autoHideDuration, open, handleSnackbarClose, position } = props;
    const [snackbarPosition, setSnackbarPosition] = useState({vertical: 'Bottom', horizontal: 'center' })

    // severity options = error, warning, info, success"
    // position options  = Top-Center, Top-Right, Bottom-Right, Bottom-Center, Bottom-Left,Top-Left
 
useEffect(()=>{
    switch (position) {
        case 'Top-Center':
          return setSnackbarPosition({vertical: 'top', horizontal: 'center' });
        case 'Top-Right':
            return setSnackbarPosition({vertical: 'top', horizontal: 'right' });
        case 'Top-Left':
            return setSnackbarPosition({vertical: 'top', horizontal: 'left'});
        case 'Bottom-Center':
          return setSnackbarPosition({vertical: 'bottom', horizontal: 'center' });
        case 'Bottom-Right':
            return setSnackbarPosition({vertical: 'bottom', horizontal: 'right' });
        case 'Bottom-Left':
            return setSnackbarPosition({vertical: 'bottom', horizontal: 'left'});

        default:
            return setSnackbarPosition({vertical: 'bottom', horizontal: 'center' });
      }
},[position])


    

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={autoHideDuration || 6000}
                anchorOrigin={snackbarPosition}
                onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity={severity}
                    style={{fontSize: '15px'}}>
                        {message}
                </Alert>
            </Snackbar>
        </div>
    );
}