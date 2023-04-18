import React from 'react';
import { Typography } from '@material-ui/core';

export default function LabelWidget({ title }) {
  return title ? (
    <div>
      <Typography style={{ marginBottom: 5 }}>{title}</Typography>
    </div>
  ) : null;
}
