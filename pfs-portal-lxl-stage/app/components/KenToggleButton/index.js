import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import KenTextLabel from '../KenTextLabel';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        border: `1px solid ${theme.palette.KenColors.neutral40}`,
    },

    selected: {
        color: theme.palette.KenColors.secondaryPink1,
        backgroundColor: theme.palette.KenColors.neutral100
    },
    toggleButton: {
        marginTop: '0 !important',
        '&$selected': {
            color: theme.palette.KenColors.primary,
            backgroundColor:theme.palette.KenColors.neutral100,
            border: `1px solid ${theme.palette.KenColors.primary} !important`,
        },

    }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        padding: 9,
        margin: 12,
        border: `1px solid ${theme.palette.KenColors.neutral40}`,
        borderRadius: 4,
        color: theme.palette.KenColors.neutral60,
        '&:not(:first-child)': {
            borderRadius: 4,
            border: `1px solid ${theme.palette.KenColors.neutral40}`,
        },
        '&:first-child': {
            borderRadius: 4,
            border: `1px solid ${theme.palette.KenColors.neutral40}`,
            marginLeft: 0,

        },
        
    },

}))(ToggleButtonGroup);

export default function KenToggleButton(props) {
    //console.log(props)
    const { value, onChange, options = [], required, optionalLabel, label, size = "small" } = props;

    const classes = useStyles();

    return (
        <div>
            <KenTextLabel label={label} optionalLabel={optionalLabel} required={required} />
            <StyledToggleButtonGroup
                size={size}
                value={value}
                exclusive
                onChange={(e, newVal) => {
                    onChange(newVal)
                }}
                style={{ display: 'flex', marginTop: 0 }}
                aria-label="text alignment"
            >
                {options.map((el) => {
                    return <ToggleButton classes={{ selected: classes.selected }} className={classes.toggleButton} value={el.value} aria-label="left aligned">
                        {el.label}
                    </ToggleButton>
                })}

            </StyledToggleButtonGroup>

        </div>
    );
}
