import React from 'react';
import {Typography,Grid,Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublicationIcon from '../../assets/icons/Publication.svg';

const useStyles = makeStyles(theme=>({
    root:{
        margin:8,
        border:`1px solid ${theme.palette.KenColors.neutral20}`,
    },
    Details:{
        color:theme.palette.KenColors.neutral400,
        fontSize:10,
        padding:16,
    },
    img:{
        maxWidth:24,
        maxHeight:24,
    },
}))


export default function PublicationCard(props) {
    
    const classes = useStyles();
    const {data} = props.data;

    return (
        <Paper className={classes.root} elevation={0}>
            <Grid container>
                <Grid item xs={12} sm={1} md={1} container justify="center" alignContent="center">
                    <img src={PublicationIcon} className={classes.img}></img>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Typography className={classes.Details}>
                        {data}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
