import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//import {Link} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    fontSize: 12,
    color: theme.palette.KenColors.primary,
    textDecoration: "none",
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link2: {
    textDecoration: "none",
    fontSize: 12,
  }
}));




export default function CustomSeparator(props) {
  const classes = useStyles();
  const array = props.array;
  console.log(props.array);
  return (
    <div className={classes.root}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {
          array && array.map(item => (
            <Link to={item.url} name={item.url} onClick={props.handleClick} className={classes.link} style={item.color ? { color: `${item.color}`, } : {}}>
              {item.head}
            </Link>
          ))
        }
      </Breadcrumbs>
    </div>
  );
}