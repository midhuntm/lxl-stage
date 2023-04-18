import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';

function Copyright({ copyrightName }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {copyrightName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
  },
  logo: {
    backgroundColor: theme.palette.KenColors.kenWhite,
    padding: '8px',
  },
  copyright: {
    color: theme.palette.KenColors.neutral100,
    paddingLeft: 20,
    fontSize: '12px',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container style={{ maxWidth: 'none' }}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography className={classes.copyright}>
              {`Copyright © ${new Date().getFullYear()} Ken42 All Rights Reserved.`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  copyrightName: PropTypes.string,
};
