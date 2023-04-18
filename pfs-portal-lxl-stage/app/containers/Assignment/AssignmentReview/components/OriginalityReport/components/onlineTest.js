import React from 'react';
import KenEditor from '../../../../../../global_components/KenEditor';
import { Typography } from '@material-ui/core';

export default function OnlineTest(props) {
  const { disabled, onWriteContent } = props;
  return (
    <React.Fragment>
      <Typography>{props.description}</Typography>
      <KenEditor
        // label={t('labels:Assessments_Descriptions')}
        label=""
        value=""
        handleChange={onWriteContent}
        content={props.content}
        // handleChange={() => console.log('Reviwed')}
        disabled={disabled}
        editorHeight="360"
      />
    </React.Fragment>
  );
}
