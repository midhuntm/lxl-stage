import React, { useState } from 'react';
import { Box, useTheme, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { getUserDetails } from '../../../../../utils/helpers/storageHelper';
import { useTranslation } from 'react-i18next';
import CaseDetailForm from './CaseDetailForm/index';

export default function CaseDetails(props) {
  return (
    <div>
      <FormikHoc {...props} />
    </div>
  );
}
const CaseDetailsMain = props => {
  const {
    handleSubmit,
    cancelItem
  } = props;

  console.log('test', props);
  return (
    <Box mt={2}>
      <CaseDetailForm
        {...props}
        handleSubmit={handleSubmit}
        cancelItem={cancelItem}
      />
    </Box>
  );
};
const FormikHoc = props => {

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const profile = getUserDetails().ContactId;
  const [formData, setFormData] = useState({});

  const DashboardCasesSchema = Yup.object().shape({
    SubType: Yup.string().required(t('Validations:Required')),
    Subject: Yup.string().required(t('Validations:Required')),
    Description: Yup.string().required(t('Validations:Required')),
  });
  const FormikForm = withFormik({
    mapPropsToValues: () => ({
      SubType: '',
      ServiceType:
        props?.data?.hed__Category__c != '-'
          ? props?.data?.hed__Category__c
          : props?.data?.Service_Type,
      Subject: props?.data?.Subject,
      Description: props?.data?.Description,
      Feedback: props?.data?.Feedback,
      Status: props?.data?.Status,
      formData: formData,
      setFormData: setFormData,
    }),
    validationSchema: DashboardCasesSchema,
    handleSubmit: values => {
      setLoading(true);
      let payload = {
        hed__Category__c: values.ServiceType,
        ContactId: profile,
        Status: values.Status,
        Origin: 'Student Portal',
        Type: props.selectedCase,
        RecordTypeId: '0121s000000CzUSAA0',
        Priority: 'Medium',
        Subject: values.Subject,
        Description: values.Description,
      };
      setLoading(false);
    },
    setFormData: setFormData,
    formData: formData,
  })(CaseDetailsMain);
  return <FormikForm {...props} />;
};