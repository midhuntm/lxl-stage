import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Question from '../../../../../../components/Question';
import OptionCardContent from './OptionCardContent';
import KenCard from '../../../../../../global_components/KenCard';

export default function SelectedTabTemplate(props) {
  const { t } = useTranslation();
  const { reviewOptions = [] } = props;
  const theme = useTheme();

  const questionData = {
    heading: t('labels:Review_Assessments_Template_Que_Heading'),
    question: t('labels:Review_Assessments_Template_Que_Question'),
    marks: t('labels:Review_Assessments_Template_Que_Marks'),
    answer: t('labels:Review_Assessments_Template_Que_Answer'),
    options: [
      { label: t('labels:Review_Assessments_Template_Que_Option_1') },
      { label: t('labels:Review_Assessments_Template_Que_Option_2') },
      { label: t('labels:Review_Assessments_Template_Que_Option_3') },
      { label: t('labels:Review_Assessments_Template_Que_Option_4') },
    ],
  };

  const getOptionCard = option => {
    if (!option.checked) return null;
    return (
      <KenCard
        active={true}
        activeBorderColor={option?.color}
        backgroundColor={theme.palette.KenColors.lightGray10}
        paperStyles={{ boxShadow: 'none' }}
      >
        <OptionCardContent data={option?.content?.data} />
      </KenCard>
    );
  };

  return (
    <>
      <Box p={2} style={{ backgroundColor: 'white' }}>
        <Question {...questionData} />
        <>
          <Box mt={2}>
            {reviewOptions?.map(opt => {
              return getOptionCard(opt);
            })}
          </Box>
        </>
      </Box>
    </>
  );
}
