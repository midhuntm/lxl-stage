import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ConfigureQuestion from '../../../../../assets/Images/configureQuestion.svg';
import { useTranslation } from 'react-i18next';
import KenHeader from '../../../../../global_components/KenHeader';
import KenButton from '../../../../../global_components/KenButton';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import KenIcon from '../../../../../global_components/KenIcon';
import CreateUpdateQuestion from './components/createUpdateContent';
import NoContent from './components/noContent';
import { TRANSACTIONS } from '../../../../../utils/constants';
import { getQuestionType } from '../QuestionTypes/Utils';
import ContentHeader from '../QuestionTypes/DisplayComponents/contentHeader';

const useStyles = makeStyles(theme => ({
  content: {
    background: theme.palette.KenColors.kenWhite,
    // overflow: 'auto',
    // maxHeight: '470px',
    // '&::-webkit-scrollbar': {
    //   width: '4px',
    // },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.KenColors.scrollbarColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.KenColors.neutral700}`,
    },
  },
  addedQuestionHeader: {
    borderBottom: `1px solid ${theme.palette.KenColors.assessmentBorder}`,
    // padding: 16,
  },

  configureContents: {
    textAlign: 'center',
    background: theme.palette.KenColors.neutral11,
    margin: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 440,
    borderRadius: 3,
  },
  label: {
    color: theme.palette.KenColors.neutral100,
    fontSize: 14,
    width: '70%',
    margin: '28px auto',
  },
  questionLabel: {
    color: theme.palette.KenColors.neutral900,
  },
  title: {
    fontSize: '14px',
    marginLeft: '5px',
  },
}));

export default function QuestionDetail(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { selectedType, selectedQuestion, transaction, setTransaction } = props;
  const [questionData, setQuestionData] = useState();
  const [newlyCreatedQuestion, setNewlyCreatedQuestion] = useState();
  console.log('selectedType', selectedType, selectedQuestion);

  //   const handlePreview = question => {
  //     console.log('handlePreview', question);
  //   };

  //   const xyz = question => {
  //     console.log('xyz', question);
  //     setNewlyCreatedQuestion(question);
  //   };

  useEffect(() => {
    let data;
    if (transaction === TRANSACTIONS.CREATE) {
      if (selectedType?.type) {
        data = getQuestionType(selectedType.type);
      }
    } else {
      if (selectedQuestion?.questiontype) {
        data = getQuestionType(selectedQuestion.questiontype);
      }
    }
    setQuestionData(data);
    //   }, [transaction, selectedType, selectedQuestion]);
  }, [props]);

  return (
    <>
      {/* <Box className={classes.addedQuestionHeader}>
        <KenHeader
          title={
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              {<KenIcon iconType="img" icon={questionData?.icon} />}
              <Typography className={classes.title}>
                {questionData?.label || t('labels:Configure_Question')}
              </Typography>
            </Box>
          }
        >
          <KenButton
            label={
              <Typography style={{ fontSize: '12px' }}>Preview</Typography>
            }
            startIcon={<VisibilityOutlinedIcon />}
            variant="secondary"
            onClick={() => handlePreview(newlyCreatedQuestion)}
          />
        </KenHeader>
      </Box> */}
      <Box>
        {!transaction ? (
          <>
            <ContentHeader /> <NoContent />
          </>
        ) : (
          <Box>
            <CreateUpdateQuestion
              {...props}
              {...selectedType}
              {...questionData}
              transaction={transaction}
              setTransaction={setTransaction}
              //   setNewlyCreatedQuestion={xyz}
              selectedQuestion={selectedQuestion}
              //newlyCreatedQuestion={newlyCreatedQuestion}
            />
          </Box>
        )}
      </Box>
      {/* <Box>
        {transaction === TRANSACTIONS.UPDATE && (
          <UpdateQuestion
            selectedQuestion={selectedQuestion}
            transaction={transaction}
          />
        )}
      </Box> */}
    </>
    // <>
    //   {selectedType?.questionContent ? (
    //     <CreateUpdateQuestion {...selectedType} />
    //   ) : selectedQuestion ? (
    //     <UpdateQuestion selectedQuestion={selectedQuestion} />
    //   ) : (
    //     <NoContent />
    //   )}
    // </>
    // <Box data-testid="question-detail">
    //   <Box className={classes.addedQuestionHeader}>
    //     <KenHeader
    //       title={
    //         label ? (
    //           <Box style={{ display: 'flex', flexDirection: 'row' }}>
    //             {<KenIcon iconType="img" icon={icon} />}
    //             <Typography className={classes.title}>{label}</Typography>
    //           </Box>
    //         ) : (
    //           <Typography className={classes.title}>
    //             {t('labels:Configure_Question')}
    //           </Typography>
    //         )
    //       }
    //     >
    //       {preview ? (
    //         <KenButton
    //           label={
    //             <Typography style={{ fontSize: '12px' }}>Preview</Typography>
    //           }
    //           startIcon={<VisibilityOutlinedIcon />}
    //           variant="secondary"
    //           onClick={() => onPreview(selectedQuestion)}
    //         />
    //       ) : null}
    //     </KenHeader>
    //   </Box>
    //   {questionContent ? (
    //     <Box className={classes.content}>{questionContent}</Box>
    //   ) : (
    //     <Box
    //       className={classes.configureContents}
    //       container
    //       alignItems="center"
    //       justify="center"
    //     >
    //       <Box>
    //         <img src={ConfigureQuestion} />
    //         <Typography className={classes.label}>
    //           {t(
    //             'messages:Add_or_edit_all_the_required_informations_and_settings_to_create_a_question_in_this_area.'
    //           )}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   )}
    // </Box>
  );
}
