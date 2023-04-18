import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { QUESTION_TYPES } from '../../../../../../utils/constants';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MultipleChoice from '../../../../../../assets/Images/multipleChoice.svg';
import Toggle from '../../../../../../assets/Images/toggle.svg';
import MatchTheContent from '../../../../../../assets/Images/matchTheContent.svg';
import SubjectiveImage from '../../../../../../assets/Images/subjective.svg';
import FillTheBlanksImage from '../../../../../../assets/Images/Fill-blanks.svg';
import Numeric from '../../../../../../assets/Images/numeric.svg';
import Subjective from '../DisplayComponents/subjective';
import MCQ from '../DisplayComponents/mcq';
import TrueFalse from '../DisplayComponents/trueFalse';
import Match from '../DisplayComponents/match';
import ShortAnswer from '../DisplayComponents/shortAnswer';
import KenIcon from '../../../../../../global_components/KenIcon';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { FaTrophy } from 'react-icons/fa';
// import Essay from '../DisplayComponents/essay';
import FillTheBlanks from '../DisplayComponents/fillTheBlanks';
import Numerical from '../DisplayComponents/numerical';
import ShortTextIcon from '@material-ui/icons/ShortText';

export const getQuestionContent = (type, question, transaction, props) => {
  switch (type) {
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      return (
        <MCQ {...props} selectedQuestion={question} transaction={transaction} />
      );

    case QUESTION_TYPES.TRUE_FALSE:
      return (
        <TrueFalse
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );

    case QUESTION_TYPES.MATCH:
      return (
        <Match
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );

    case QUESTION_TYPES.SHORT_ANSWER:
      return (
        <ShortAnswer
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );

    // case QUESTION_TYPES.ESSAY:
    //   return(
    //     <Essay {...props}
    //     selectedQuestion={question}
    //     transaction={transaction}
    //     />
    //   )
    case QUESTION_TYPES.FILLTHEBLANKS:
      return (
        <FillTheBlanks
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );
    case QUESTION_TYPES.NUMERICAL:
      return (
        <Numerical
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );
    case QUESTION_TYPES.SUBJECTIVE:
    default:
      return (
        <Subjective
          {...props}
          selectedQuestion={question}
          transaction={transaction}
        />
      );
  }
};

export const QuestionTypes = [
  {
    icon: MultipleChoice,
    label: 'Multiple choice',
    infoIcon: <InfoOutlinedIcon />,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
  },
  {
    icon: Toggle,
    label: 'True / False',
    infoIcon: <InfoOutlinedIcon />,
    type: QUESTION_TYPES.TRUE_FALSE,
  },
  //   {
  //     icon: MatchTheContent,
  //     label: 'Match the following',
  //     infoIcon: <InfoOutlinedIcon />,
  //     type: QUESTION_TYPES.MATCH,
  //   },
  {
    // label: 'Subjective',
    // type: QUESTION_TYPES.SUBJECTIVE,
    icon: SubjectiveImage,
    label: 'Essay',
    infoIcon: <InfoOutlinedIcon />,
    type: QUESTION_TYPES.ESSAY,
  },
  // {
  //   icon: SubjectiveImage,
  //   label: 'Essay',
  //   infoIcon: <InfoOutlinedIcon />,
  //   type: QUESTION_TYPES.ESSAY,
  // }
  //   {
  //     icon: FillTheBlanksImage,
  //     label: 'Fill in the blanks',
  //     infoIcon: <InfoOutlinedIcon />,
  //     type: QUESTION_TYPES.FILLTHEBLANKS,
  //   },
  // {
  //   icon: Numeric,
  //   label: 'Numericals',
  //   infoIcon: <InfoOutlinedIcon />,
  //   type: QUESTION_TYPES.NUMERICAL,
  // },
  {
    icon: <ShortTextIcon style={{ color: '#00218d' }} />,
    label: 'Short Answer',
    infoIcon: <InfoOutlinedIcon />,
    type: QUESTION_TYPES.SHORT_ANSWER,
  },
];

export const getQuestionType = type => {
  return QuestionTypes.find(item => item.type === type);
};

export const getIcon = (type, textColor) => {
  const theme = useTheme();
  switch (type) {
    case 'check':
      return (
        <KenIcon
          icon={CheckIcon}
          styles={{
            color: theme.palette.KenColors.tertiaryGreen300 || textColor,
          }}
        />
      );

    case 'cross':
      return (
        <KenIcon
          icon={ClearIcon}
          styles={{
            color: theme.palette.KenColors.tertiaryRed400 || textColor,
          }}
        />
      );

    case 'exclamation':
      return (
        <KenIcon
          icon={PriorityHighIcon}
          styles={{
            color: theme.palette.KenColors.tertiaryYellow300 || textColor,
          }}
        />
      );

    case 'trophy':
      return (
        <KenIcon
          icon={FaTrophy}
          styles={{
            color: theme.palette.KenColors.tertiaryBlue502 || textColor,
          }}
        />
      );

    default:
      return null;
  }
};

export const uniqueArrayObjects = (array, key) => {
  return array.reduce(function (previous, current) {
    if (
      !previous.find(function (prevItem) {
        if (key) {
          return prevItem[key] === current[key];
        } else {
          return prevItem === current;
        }
      })
    ) {
      previous.push(current);
    }
    return previous;
  }, []);
};
