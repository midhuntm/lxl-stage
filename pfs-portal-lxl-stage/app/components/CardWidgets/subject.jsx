import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChemIcon from '../../assets/Chemistry2.png';


const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        minWidth: '33vw',
        height: 56,
        padding: 16,
        border: `1px solid ${theme.palette.KenColors.neutral20}`,
        '&:hover': {
            cursor: 'pointer',
        }
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    img: {
        marginRight: 8,
    }
}));

export default function SubjectCard(props) {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root} >
            <img className={classes.img} src={ChemIcon}></img>
            <Typography color='primary' className={classes.title}>{props.data.hed__Course__cName} </Typography>
        </Paper>
    );
}
