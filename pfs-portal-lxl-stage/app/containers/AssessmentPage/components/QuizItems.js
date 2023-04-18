import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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
import KenRadioGroup from '../../../global_components/KenRadioGroup';
import KenCheckboxGroup from '../../../global_components/KenCheckboxGroup';
import FlagIcon from '@material-ui/icons/Flag';
import KenButton from '../../../global_components/KenButton';
import Multimedia from './Multimedia';
import parse from 'html-react-parser';
import QuizContentSubjective from './QuizContentSubjective';
import Subjective from './QuizItemsSubjective';
import MatchOptions from './MatchOptions';
import { debounce } from 'lodash';
import { withFormik } from 'formik';
import ImageViewer from "react-simple-image-viewer";

const useStyles = makeStyles(theme => ({
  question: {
    color: theme.palette.KenColors.neutral400,
    fontSize: 14,
    fontWeight: 600,
  },
  questionTag: {
    marginRight: 16,
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
  questionTypoText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    minWidth: 'max-content',
    paddingRight: 5,
    color: theme.palette.KenColors.neutral400,
    float: 'left',
  },
  questionTypoBox: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.KenColors.neutral400,
  },
  // mediaFile: {
  //   width: '400px',
  //   margin: '0px 20px',
  //   cursor: 'pointer'
  // }
}));

const QuizItems = memo(
  ({
    quizItem = { question: '', options: [], type, id },
    handleAnswerChange,
    setItemId,
    itemId,
    setAnswered,
    multianswer,
    setMultianswer,
  }) => {
    const {
      question,
      options,
      type,
      id,
      status,
      serialNumber,
      answer,
      mark,
    } = quizItem;
    const classes = useStyles();
    const [value, setValue] = useState(answer);
    // const [questionText, setQuestionText] = useState('');
    const [uploading, setUploading] = useState(!quizItem?.itemId);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const handleChange = event => {
      handleAnswerChange('flagged', id, event.target.checked);
    };

    //To split the url with media image 
    // const [mediaFile, setMediaFile] = useState(false)
    // useEffect(() => {
    //   if (question) {
    //     let mediaFileIndex = question.search('filename')
    //     let questionTextArr = question.split('&&fileurl=')
    //     let questionText = question

    //     let mediaFile = ''
    //     if (mediaFileIndex !== -1 && questionTextArr.length > 1) {
    //       let imgDetails = String(questionTextArr[1]).split('&&filename=')
    //       mediaFile = String(imgDetails[0])
    //       setMediaFile(mediaFile)
    //     }
    //     else {
    //       setMediaFile(false)
    //     }
    //     questionText = questionTextArr.length > 1 ? questionTextArr[0] : questionText
    //     setQuestionText(questionText)
    //   }
    // }, [question])

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

    const handleLocalAnswer = val => {
      handleAnswerChange('answered', id, val);
      setValue(val);
    };

    // const handleLocalAnswer = debounce(val => {
    //   handleAnswerChange('answered', id, val);
    //   setValue(val);
    // }, 50);

    const RenderOptions = props => {
      const {
        values,
        handleSubmit,
        handleChange,
        setFieldTouched,
        setFieldValue,
      } = props;

      const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
      };

      const handleAnswerSubmit = debounce(() => {
        handleSubmit();
      }, 50);

      switch (type) {
        case 'numerical':
          return (
            <TextField
              multiline
              name="answerText"
              value={values.answerText}
              variant="outlined"
              onChange={change.bind(null, 'answerText')}
              onBlur={handleAnswerSubmit}
              //   onChange={e => {
              //     // setValue(e.target.value);
              //     handleLocalAnswer(e.target.value);
              //     // handleAnswerChange('answered', id, e.target.value);
              //   }}
              fullWidth={true}
            />
          );
        case 'shortanswer':
          return (
            <TextField
              multiline
              name="answerText"
              value={values.answerText}
              variant="outlined"
              onChange={change.bind(null, 'answerText')}
              onBlur={handleAnswerSubmit}
              //   onChange={e => {
              //     // setValue(e.target.value);
              //     handleLocalAnswer(e.target.value);
              //     // handleAnswerChange('answered', id, e.target.value);
              //   }}
              fullWidth={true}
            />
          );
        case 'essay':
          return (
            <Subjective
              name="answerText"
              value={values.answerText}
              onChange={change.bind(null, 'answerText')}
              onBlur={handleAnswerSubmit}
              //   onChange={e => {
              //     // setValue(e.target.value);
              //     handleLocalAnswer(e.target.value);
              //     // handleAnswerChange('answered', id, e.target.value);
              //   }}
              setItemId={setItemId}
              itemId={itemId}
              id={id}
              handleAnswerChange={handleAnswerChange}
              uploading={uploading}
              setUploading={setUploading}
            />
          );
        /* case 'match':
        return (
          <MatchOptions
            options={options}                   
            handleAnswerChange={handleAnswerChange}
            id={id}
            value={value}
            setValue={setValue}
            multianswer={multianswer} 
            setMultianswer={setMultianswer}
          />
        ); */

        case 'multichoice':
        case 'truefalse':
        default:
          return (
            <KenRadioGroup
              options={getOptions()}
              row={false}
              name="answerText"
              value={values.answerText}
              onChange={newVal => {
                setFieldValue('answerText', newVal);
                handleAnswerSubmit();
                //   handleLocalAnswer(newVal);
                // handleAnswerChange('answered', id, newVal);
              }}
            //   onBlur={handleAnswerSubmit}
            />
          );
      }
    };

    const RenderOptionsFormikHOC = props => {
      const { answer, handleAnswerChange, id } = props;

      const FormikForm = withFormik({
        mapPropsToValues: () => ({
          answerText: answer,
        }),

        handleSubmit: values => {
          console.log('handle submit values', values);
          handleAnswerChange('answered', id, values.answerText);
          // handleAnswerChange()
        },
        displayName: 'RenderOptions',
      })(RenderOptions);
      return <FormikForm {...props} />;
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

    const openImageViewer = () => {
      setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
      setIsViewerOpen(false);
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
              <Grid item xs={10} >
                {/* <Typography
                  className={[classes.question, classes.questionTag].join(' ')}
                  component="span"
                  style={{ display: 'flex', alignItems: 'baseline' }}
                >
                  {serialNumber}
                </Typography>

                {parse(`${question}`)} */}
                <div className={classes.questionTypoBox}>
                  <p className={classes.questionTypoText}>{serialNumber}.</p>
                  <div>{parse(`${question}`)}
                  </div>
                </div>
                {/* {
                imgurl && imgurl!==null?(<Multimedia question={question} mediaImg={imgurl}/>):''
              } */}
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                <Typography className={classes.queMarksText} component="span">
                  {Math.floor(mark)} mark{' '}
                  {/* TODO: add maxMark instead of mark*/}
                </Typography>
                <Typography
                  component="span"
                  style={{
                    marginLeft: '20px',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={id}
                        icon={<FlagOutlinedIcon />}
                        checkedIcon={
                          <FlagIcon className={classes.checkedIcon} />
                        }
                        name="flagMark"
                        checked={
                          status === 'Flagged' ||
                          status === 'Answered & Flagged'
                        }
                        onChange={handleChange}
                      />
                    }
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* {mediaFile &&
            <Box style={{ width: '100%' }} m={2}>
              <img className={classes.mediaFile}
                title="Click on the image to enlarge/view details"
                src={mediaFile}
                onClick={() => openImageViewer()}
              />
            </Box>
          } */}
          <Grid item xs={12}>
            <Box style={{ minHeight: '150px' }}>
              <RenderOptionsFormikHOC
                answer={answer}
                handleAnswerChange={handleAnswerChange}
                id={id}
              />
              {/* {renderOptions()} */}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <KenButton
            variant="secondary"
            label="Clear answer"
            onClick={() => {
              clearAnswer();
              setAnswered();
            }}
          />
        </Grid>
        {/* {isViewerOpen && (
          <ImageViewer
            src={[mediaFile]}
            onClose={closeImageViewer}
            disableScroll={true}
            backgroundStyle={{
              backgroundColor: "rgb(10 10 10 / 90%)"
            }}
            closeOnClickOutside={true}
          />
        )} */}
      </Box >
    );
  }
);
export default QuizItems;
