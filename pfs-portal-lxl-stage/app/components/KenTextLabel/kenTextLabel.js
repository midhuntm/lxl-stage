import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import KenColors from '../../utils/themes/KenColors';

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: '12px',
        lineHeight: '16px',
        color: KenColors.neutral400,
    },
    optional: {
        fontSize: '12px',
        lineHeight: '16px',
        color: KenColors.neutral100,
    },
    labelWrap: {
        marginBottom: 2
    },
}))
export default function KenTextLabel(props) {
    const classes = useStyles();
    const {
        label,
        required,
        optionalLabel,
    } = props;

    return (<div className={classes.labelWrap}>
        <Grid container justify="space-between">
            <Grid item>
                <Typography className={classes.label}>{label}</Typography>
            </Grid>
            <Grid item>
                <Typography className={classes.optional}>{!required && optionalLabel ? 'Optional' : ' '}</Typography>
            </Grid>
        </Grid>
    </div>

    )
}
