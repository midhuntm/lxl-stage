import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import KenRadioGroup from '../../../../../global_components/KenRadioGroup';
import KenCheckboxGroup from '../../../../../global_components/KenCheckboxGroup';
import KenButton from '../../../../../global_components/KenButton';
import Multimedia from '../../../../AssessmentPage/components/Multimedia';
import parse from 'html-react-parser';
import QuizContentSubjective from '../../../../AssessmentPage/components/QuizContentSubjective';
import Subjective from '../../../../AssessmentPage/components/QuizItemsSubjective';
import KenInputField from '../../../../../components/KenInputField';

const useStyles = makeStyles(theme => ({
  question: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 14,
    fontWeight: 600,
    '& img':{
      width: 200,
      height: 100
    },
    '& video':{
      width: 200,
      height: 100
    }
  },
  questionTag: {
    marginRight: 16,
    minWidth: '40px',
  },
  queMarks: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    alignSelf: 'end',
  },
  queMarksText: {
    color: theme.palette.KenColors.gradeSectionHeaderLabel,
    fontSize: 12,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  queMarksIcon: {
    color: theme.palette.KenColors.flagIconColor,
    border: `1px solid ${theme.palette.KenColors.flagIconBorderColor}`,
    borderRadius: 3,
    marginLeft: 16,
  },
  optionsText: {
    fontSize: 13,
    color: theme.palette.KenColors.neutral400,
  },
  checkedIcon: {
    color: theme.palette.KenColors.primary,
  },
  labelText: {
    fontSize: '12px',
    fontWeight: 600,
  },
}));

export default function QuizItems({
  quizItem = { question: '', options: [], type, id, matchOptions },
  handleAnswerChange,
  setItemId,
  itemId,
  setAnswered,
}) {
  const {
    question,
    options,
    type,
    id,
    status,
    serialNumber,
    answer,
    mark,
    matchOptions,
  } = quizItem;
  const classes = useStyles();
  const [value, setValue] = useState(answer);

  const handleChange = event => {
    handleAnswerChange('flagged', id, event.target.checked);
  };

  const clearAnswer = () => {
    setValue('');
    setAnswered();
    handleAnswerChange('answered', id, '');
  };

  const getOptions = () => {
    return options?.map(option => {
      return { label: option?.label, value: option?.value?.toString() };
    });
  };

  const MatchColumns = () => {
    return (
      <Box padding="32px 32px" pl={0}>
        {Array.isArray(matchOptions) && matchOptions.length > 0 && (
          <Grid container xs={12} md={12}>
            <>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={6}>
                  <Typography className={classes.labelText}>
                    Column A
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.labelText}>
                    Column B
                  </Typography>
                </Grid>
                {matchOptions?.map((optItem, index) => {
                  return (
                    <React.Fragment>
                      <Grid item xs={6}>
                        <KenInputField
                          value={matchOptions[index]['qtext']}
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <KenInputField
                          value={matchOptions[index]['answertext']}
                          disabled={true}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
              {/* <Divider className={classes.divider} /> */}
            </>
          </Grid>
        )}
      </Box>
    );
  };

  const renderOptions = () => {
    switch (type) {
      case 'numerical':
      case 'shortanswer':
        return (
          <TextField
            multiline
            value={value}
            variant="outlined"
            onChange={e => {
              setValue(e.target.value);
              handleAnswerChange('answered', id, e.target.value);
            }}
            fullWidth={true}
          />
        );

      case 'essay':
        return (
          <Subjective
            value={value}
            onChange={e => {
              setValue(e.target.value);
              handleAnswerChange('answered', id, e.target.value);
            }}
            setItemId={setItemId}
            itemId={itemId}
            id={id}
            handleAnswerChange={handleAnswerChange}
            hideFileDrop={true}
          />
        );

      case 'match':
        return <MatchColumns />;

      case 'multichoice':
      case 'truefalse':
      default:
        return (
          <KenRadioGroup
            options={getOptions()}
            row={false}
            value={value}
            onChange={newVal => {
              setValue(newVal);
              handleAnswerChange('answered', id, newVal);
            }}
          />
        );
    }
  };

  const imgurl =
    'https://media.cntraveler.com/photos/5cb63a087b743b471660a8da/master/w_1920%2Cc_limit/Angel-Falls-Venezuela_GettyImages-165513023.jpg';

  const support = (function () {
    if (!window.DOMParser) return false;
    const parser = new DOMParser();
    try {
      parser.parseFromString('x', 'text/html');
    } catch (err) {
      return false;
    }
    return true;
  })();

  const stringToHTML = str => {
    // If DOMParser is supported, use it
    if (support) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(str, 'text/html');
      return doc.body;
    }

    // Otherwise, fallback to old-school method
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

  const getFillInTheBlanksQUestion = q => {
    return q?.replace(/\[\[[^\]]*\]\]/g, '_____________');
  };

  return (
    <Box width={'100%'}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid
            item
            container
            direction="row"
            spacing={0}
            justifyContent="space-between"
            xs={12}
            md={12}
          >
            <Grid item xs={10}>
              {type !== 'essay' ? (
                <Box display="flex" alignItems="center">
                  <Typography
                    className={[classes.question, classes.questionTag].join(' ')}
                    component="span"
                  >
                    {serialNumber}
                  </Typography>
                  {type !== 'gapselect' ? (
                    <Typography className={classes.question} component="span">
                      {parse(`${question}`)}
                    </Typography>
                  ) : (
                    <Typography className={classes.question} component="span">
                      {parse(`${getFillInTheBlanksQUestion(question)}`)}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box display="flex" alignItems="center" className={classes.question}>
                  {serialNumber}&nbsp;&nbsp;&nbsp; {parse(`${question}`)}
                </Box>
              )}
              {/* {parse(`${question}`)} */}

              {/* {
                imgurl && imgurl!==null?(<Multimedia question={question} mediaImg={imgurl}/>):''
              } */}
            </Grid>
            {mark && (
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                <Typography className={classes.queMarksText} component="span">
                  {Math.floor(mark)} mark{' '}
                  {/* TODO: add maxMark instead of mark*/}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        {type !== 'gapselect' &&
          type !== 'essay' &&
          type !== 'numerical' &&
          type !== 'shortanswer' && (
            <Grid item xs={12}>
              <Box pl={8}>{renderOptions()}</Box>
            </Grid>
          )}
      </Grid>
    </Box>
  );
}
