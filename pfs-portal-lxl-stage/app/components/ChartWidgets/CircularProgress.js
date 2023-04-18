import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const defaultSize = 50;

class ColoredCircularProgressComponent extends Component {
  render() {
    const { classes, size } = this.props;
    return <CircularProgress variant="static"{...this.props} classes={classes} size={size} />;
  }
}

class ColoredCircularProgress extends Component {
  render() {
    const WithStylesComponent = withStyles(theme => ({
      colorPrimary: {
        color: this.props.foreColor
      },
      root: {
        top: `calc(50% - ${this.props.size / 2}px)`,
        left: `calc(50% - ${this.props.size / 2}px)`,
        position: 'absolute'
      }
    }))(ColoredCircularProgressComponent);
    return <WithStylesComponent {...this.props} />;
  }
}

ColoredCircularProgress.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.number,
  foreColor: PropTypes.string
};
ColoredCircularProgress.defaultProps = {
  size: defaultSize,
  foreColor: 'green'
};

export default ColoredCircularProgress;
