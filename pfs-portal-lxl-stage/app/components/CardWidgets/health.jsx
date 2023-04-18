import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import KenColors from '../../utils/themes/KenColors';
import Drop from '../../assets/MentalHelath.png';
const useStyles = makeStyles(theme=>({
    root: {
        minWidth: 100,
        padding: 16,
        boxShadow: `0px 0px 9px ${theme.palette.KenColors.shadowColor}`,
        borderRadius: 3,
    },
    title: {
        fontSize: 10,
        lineHeight: '14px',
        color: `${theme.palette.KenColors.neutral100}`,

    },
    details: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        color: `${theme.palette.KenColors.neutral700}`,
    },
    percent: {
        fontSize: '25px',
    },
    photoGrid: {
        background: theme.palette.KenColors.neutral20,
        height: 56,
        width: 56,
        borderRadius: '50%'
    },
}));

export default function HealthDetail(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <Paper elevation={0} className={classes.root}>
            <Grid container item alignItems="center" spacing={2}>
                <Grid item className={classes.photoGrid} >
                    <img  src={Drop}></img>
                </Grid>
                <Grid item >
                    <Box>
                        <Typography className={classes.title}>{data.title}</Typography>
                        <Typography className={classes.details} >{data.titleDetails}</Typography>
                    </Box>

                </Grid>

            </Grid>

        </Paper>


    );
}
