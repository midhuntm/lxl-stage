import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120
    // },
    selectEmpty: {
        marginTop: '16px',
        //  border: "1px solid grey !important",
        // paddingLeft: "5px !important",
        padding: 10,
        height: '36px',
        marginBottom: 16,
        backgroundColor: "white"
    },
}));

const DropDown = (props) => {
    const { data, onchange, value } = props;
    console.log(props);
    const options = []
    data.forEach(element => {
        options.push({
            Id: element.Id,
            Program_Plan: element.Program_Plan,
            hed__Account__c: element.hed__Account__c
        })
    });

    console.log(options)
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">Select Program</InputLabel>
                <Select
                    id="simple-select-label"
                    value={value}
                    onChange={(event) => { onchange(event.target.value, event.target.programId) }}
                    displayEmpty='true'
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >


                    {
                        options.map((option, index) => {
                            return <MenuItem key={index} programId={options.hed__Account__c} value={option.Id}>{option.Program_Plan}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )

}

export default DropDown;