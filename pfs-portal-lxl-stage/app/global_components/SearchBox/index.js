import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        border: `1px solid #DFE1E6`,
        // margin: '16px'
    },
    searchIcon: {
        padding: '3px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        opacity: '0.54',
        zIndex: 100
    },
    inputRoot: {
        color: 'inherit',
        backgroundColor: theme.palette.KenColors.neutral10,
        borderRadius: '3px',
        height: '38px'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        // width: 'auto',
        height: '38px',
        [theme.breakpoints.up('sm')]: {
            // width: 'auto',
            '&:focus': {
                // width: 'auto',
            },
        },
    },

}));

const SearchBox = (props) => {
    const classes = useStyles();

    return (

        <div className={classes.searchBox}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={props.searchHandler}
                />
            </div>
        </div >
    );
}


export default SearchBox;