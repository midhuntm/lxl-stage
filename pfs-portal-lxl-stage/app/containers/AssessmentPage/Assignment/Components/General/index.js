import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import KenInputField from '../../../../components/KenInputField/index';
import KenToggleButton from '../../../../global_components/KenToggleButton/index';
import KenCheckBox from '../../../../global_components/KenCheckbox/index';
import KenLoader from '../../../../components/KenLoader';
import { useTranslation } from 'react-i18next';
import KenSelect from '../../../../components/KenSelect';
import KenEditor from '../../../../global_components/KenEditor';

import KenMultiSelect from '../../../../global_components/KenMultiSelect';
import { uniqueArrayObjects } from '../../../Assessment/QuestionPage/Components/QuestionTypes/Utils';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
  },
}));

export default function General(props) {
  const { values, setValues, touched, errors, handleChange, setFieldTouched, setFieldValue, } = props;

  const { t } = useTranslation();
  const [sectionsArray, setSectionsArray] = React.useState([]);
  const [sectionsWithIdsArray, setSectionsWithIdsArray] = React.useState(props?.values?.formData?.sectionsWithIdsArray || []);
  const [selectedSectionsArray, setSelectedSectionsArray] = React.useState(props?.values?.formData?.sectionNames || []);
  const [subjectsArray, setSubjectsArray] = React.useState(props?.values?.formData?.subjectName ? [props?.values?.formData?.subjectName] : []);

  // const [assessmentInstructions, setAssessmentInstructions] = React.useState('');

  const change = (name, e, index) => {
    e.persist();
    handleChange(e);
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true, false);

    if (name == "displayDescription" && e.target.checked) {
      values.displayDescription = e.target.checked
      setFieldValue(name, e.target.checked);
      setValues(values)
    }
  };

  const compare = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  React.useEffect(() => {
    const currentSectionArray = [];
    const currentSubjectArray = [];
    // setSelectedSectionsArray([]);
    setFieldValue('className', values.className);
    setFieldValue('sectionNames', values.sectionNames);
    values.courses?.map((data, i) => {
      if (data.accountname == values.className) {
        //subjects
        currentSubjectArray.push(data.hed__Course__cName);
        let subSubjectArray = [...new Set(currentSubjectArray)];
        // let subSubjectArray = uniqueArrayObjects(currentSubjectArray, 'label');
        subSubjectArray.sort(compare);
        setSubjectsArray(subSubjectArray);
      } else {
        return null;
      }
    });
  }, [values.className]);

  React.useEffect(() => {
    const currentSubjectArray = [];
    const myClasses = values.courses?.filter((data, i) => data.accountname == values.className);
    const mySubjects = myClasses?.filter((data, i) => data.hed__Course__cName == values.subjectName);
    // console.log('myClasses', myClasses);
    // console.log('mySubjects', mySubjects);
    const sections = mySubjects?.map(item => { return item.Section; });
    const sectionsWithIds = mySubjects?.map(item => {
      return {
        label: item.Section,
        value: item.CourseOfferingID,
      };
    });
    //subjects
    // currentSubjectArray.push(data.hed__Course__cName);
    // let subSubjectArray = [...new Set(currentSubjectArray)];
    let secArray = uniqueArrayObjects(sections);
    let secIdsArray = uniqueArrayObjects(sectionsWithIds, 'label');
    // subSubjectArray.sort(compare);
    // setSubjectsArray(subSubjectArray);
    // });
    setSectionsArray(secArray);
    setSectionsWithIdsArray(secIdsArray);
  }, [values.subjectName]);

  const handleSectionChange = (e, selectedItems) => {
    // console.log('selectedItems', selectedItems);
    let mySections = [];
    selectedItems?.map(selectedItem => {
      const array = sectionsWithIdsArray?.filter(
        item => item.label === selectedItem
      );
      if (array?.length > 0) {
        mySections = [...mySections, ...array];
      }
    });
    console.log('mySections', mySections);
    setSelectedSectionsArray(selectedItems);
    setSectionsWithIdsArray(mySections);
  };

  const handleCheck = (e, item) => {
    console.log('check', e.target.checked);
    console.log('item', item);
    return false;
  };

  useEffect(() => {
    if (!props?.values?.formData?.sectionNames) {
      setFieldValue('sectionNames', selectedSectionsArray);
    }
  }, [selectedSectionsArray]);

  useEffect(() => {
    setFieldValue('sectionNameWithIds', sectionsWithIdsArray);
  }, [sectionsWithIdsArray]);

  useEffect(() => {
    if (!props?.values?.formData?.subjectName) {
      setFieldValue('subjectName', subjectsArray?.length > 0 ? subjectsArray[0] : values.subjectName);
    }
  }, [subjectsArray]);

  return (
    <form onSubmit={values.handleChange}>
      <Grid container spacing={2}>
        {values.loading && <KenLoader />}
        <Grid item xs={12}>
          <KenInputField
            required
            label={t('labels:Assignment_Name')}
            placeholder="Enter assignment name"
            value={values.assignmentName}
            name="assignmentName"
            onChange={change.bind(null, 'assignmentName')}
            errors={errors?.assignmentName}
            setFieldTouched={setFieldTouched}
            touched={touched?.assignmentName}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <KenSelect
            onChange={e => { setFieldValue('className', e.target.value); }}
            value={values.className}
            required={true}
            setFieldTouched={setFieldTouched}
            label={t('labels:Select_class')}
            options={values?.classesArray?.sort(compare)}
            name="className"
            // exclusive={true} // we can select only one option
            variant="outline"
            errors={errors?.className}
            touched={touched?.className}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <KenSelect
            onChange={event => {
              console.log('e.target.value', event.target.value);
              setFieldValue('subjectName', event.target.value);
            }}
            name="subjectName"
            value={values.subjectName}
            label={t('labels:Select_subject')}
            options={subjectsArray}
            setFieldTouched={setFieldTouched}
            // required={true}
            variant="outline"
            errors={errors?.subjectName}
            touched={touched?.subjectName}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <KenMultiSelect
            // required={true}
            onChange={handleSectionChange}
            selectAll={true}
            checkMarks={true}
            setFieldTouched={setFieldTouched}
            name="sectionNames"
            value={values.sectionNames}
            // value={selectedSectionsArray}
            // label="Select section"
            label={t('labels:Select_section')}
            options={sectionsArray}
            // required={true}
            variant="outline"
            errors={errors?.sectionNames}
            touched={touched?.sectionNames}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <KenEditor
            // label={t('labels:Assessments_Descriptions')}
            label={t('labels:Assignment_Instructions')}
            value={values.descriptionDetail}
            errors={errors?.descriptionDetail}
            touched={touched?.descriptionDetail}
            content={values.descriptionDetail}
            setFieldTouched={setFieldTouched}
            handleChange={(e) => {
              setFieldValue('descriptionDetail', e)
              setFieldTouched('descriptionDetail', true)
            }}
          />
          {/* <Grid md={6} item >
            <KenCheckBox
              label={t('labels:Display_Description_On_Course_Page')}
              value={values.displayDescription}
              name="displayDescription"
              onChange={change.bind(null, 'displayDescription')}
            />
          </Grid> */}
        </Grid>

      </Grid>
    </form>
  );
}
