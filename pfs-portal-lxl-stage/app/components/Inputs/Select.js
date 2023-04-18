import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        // minWidth: 120
        width: "100%"
    },
    selectEmpty: {
        // marginTop: '16px',
        // marginLeft: '32px',
        // border: "1px solid grey !important",
        // paddingLeft: "5px !important",
        // width: '158px',
        height: '36px'
    }
}));

const select = (props) => {
    const { options,value,onchange } = props;

    const classes = useStyles();

    return (
        <Typography className={classes.root}>
            <FormControl className={classes.formControl}>
                <Select
                    value={value}
                    onChange={onchange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="" disabled> 
                        Select
                    </MenuItem>
                    {
                        options && options.map((option, index) => {
                            return <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Typography>
    )

}

export default select;