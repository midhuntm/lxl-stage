import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import KenButton from '../../../../../../global_components/KenButton';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

import ChapterJson from '../ResourcesFilter/Chapter.json';
import TopicJson from '../ResourcesFilter/Topic.json';
import GradedJson from '../ResourcesFilter/Graded.json';
import PublishedJson from '../ResourcesFilter/Published.json';
import SearchBox from '../../../../../../global_components/SearchBox';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';
import { Assessment, Assignment } from '@material-ui/icons';
import { getUserDetails } from '../../../../../../utils/helpers/storageHelper';

import 'date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import KenRadioGroup from '../../../../../../global_components/KenRadioGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panelHeader: {
    fontWeight: 600,
    fontSize: '14px',
  },
  clearAllButton: {
    color: theme.palette.KenColors.orange10,
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'capitalize',
  },
  containerModify: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      opacity: '0.2',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      borderRadius: '10px',
      opacity: '0.1',
      outline: `1px solid ${theme.palette.KenColors.neutral100}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: ` ${theme.palette.KenColors.neutral100}`,
    },
  },
}));

export default function ResourcesFilter(props) {
  const classes = useStyles();
  const {
    setResourceType,
    resourceType,
    setFormDate,
    setToDate,
    closeFilter,
    formDateRes,
    setFormDateRes,
    toDateRes,
    setToDateRes,
    publishRes,
    setPublishRes,
  } = props;

  const { t } = useTranslation();

  // const [AssessCheck, setAssessCheck] = useState();

  //for filter
  const [chapter, setChapter] = useState([]);
  const [chapterText, setChapterText] = useState();

  const [topic, setTopic] = useState([]);
  const [topicText, setTopicText] = useState();

  const [gradedRadio, setGradedRadio] = React.useState({});
  const [publishedRadio, setPublishedRadio] = React.useState({});
  const userDetails = getUserDetails();

  const {
    Presentation,
    Excel,
    Video,
    Pdf,
    Books,
    File,
    Links,
    Label,
    Page,
    Folder,
  } = resourceType;

  //for filter accord
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //use effect for search box

  useEffect(() => {
    if (topicText) {
      setTopic(prev => {
        const filtterd = TopicJson.filter(
          c => c.heading.indexOf(topicText) > -1
        );
        return [...filtterd];
      });
    } else {
      setTopic(TopicJson);
    }
  }, [topicText]);
  //
  useEffect(() => {
    if (chapterText) {
      setChapter(prev => {
        const filtterd = ChapterJson.filter(
          c => c.heading.indexOf(chapterText) > -1
        );
        return [...filtterd];
      });
    } else {
      setChapter(ChapterJson);
    }
  }, [chapterText]);

  //

  const handleFilterContent = event => {
    setResourceType({
      ...resourceType,
      [event.target.name]: event.target.checked,
    });
  };

  /*  const radioButtonGraded = event => {
    setGradedRadio(event.target.value);
  };
  const radioButtonPublished = event => {
    setPublishedRadio(event.target.value);
  };
 */
  const radioButtonPublished = value => {
    console.log('publish unpublish data', value);
    setPublishedRadio(value);
    switch (value) {
      case 'Published':
        setPublishRes(1);
        break;
      case 'Unpublished':
        setPublishRes(0);
        break;
      case 'All':
        setPublishRes(null);
        break;
    }
  };

  const handleFromDateChange = date => {
    setFormDateRes(date);
  };
  const handleToDateChange = date => {
    setToDateRes(date);
  };

  const handleClearAllFilter = e => {
    setChapter([]);
    setChapterText([]);
    setTopic([]);
    setTopicText([]);
    setGradedRadio({});
    setPublishedRadio({});
    setResourceType([]);
    setFormDate();
    setToDate();
    closeFilter();
  };

  //radio options
  const pubUnpubOptions = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Published',
      value: 'Published',
    },
    {
      label: 'Unpublished',
      value: 'Unpublished',
    },
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        data-testid="questionbank-filters"
        style={{ height: '40px' }}
      >
        <Grid item>
          <Typography className={classes.panelHeader}>
            {t('labels:Filters')}
          </Typography>
        </Grid>
        <Grid item>
          <KenButton onClick={handleClearAllFilter}>
            <Typography
              className={classes.clearAllButton}
              data-testid="clearall-button"
            >
              {t('labels:Clear_all')}
            </Typography>
          </KenButton>
        </Grid>
      </Grid>

      <Grid>
        <Grid className={classes.containerModify}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Resource Type</Typography>
              {/* <pre>{JSON.stringify(props)}</pre> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid item md={12} sm={12} xs={12}>
                {/* {ActivityTypeJson.map((e,index) => {
                    return (
                   
                    );
                  })} */}
                <>
                  <Grid>
                    <Grid item xs={12} md={12} sm={12}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Presentation}
                                onChange={handleFilterContent}
                                name="Presentation"
                              />
                            }
                            label="Presentation"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Excel}
                                onChange={handleFilterContent}
                                name="Excel"
                              />
                            }
                            label="SpreadSheet"
                          />
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                checked={File}
                                onChange={handleFilterContent}
                                name="File"
                              />
                            }
                            label="File"
                          /> */}
                          {/*  <FormControlLabel
                            control={
                              <Checkbox
                                checked={Books}
                                onChange={handleFilterContent}
                                name="Books"
                              />
                            }
                            label="Books"
                          /> */}
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Video}
                                onChange={handleFilterContent}
                                name="Video"
                              />
                            }
                            label="Video"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Pdf}
                                onChange={handleFilterContent}
                                name="Pdf"
                              />
                            }
                            label="Pdf"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Links}
                                onChange={handleFilterContent}
                                name="Links"
                              />
                            }
                            label="Links"
                          />

                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                checked={Label}
                                onChange={handleFilterContent}
                                name="Label"
                              />
                            }
                            label="Label"
                          /> */}
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                checked={Page}
                                onChange={handleFilterContent}
                                name="Page"
                              />
                            }
                            label="Page"
                          /> */}
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                checked={Folder}
                                onChange={handleFilterContent}
                                name="Folder"
                              />
                            }
                            label="Folder"
                          /> */}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Divider />

        {/*   <Grid className={classes.containerModify}>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Chapter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item md={12} sm={12} xs={12}>
                <SearchBox
                  searchHandler={e => setChapterText(e.target.value)}
                />

                {chapter.map(e => {
                  return (
                    <>
                      <Grid>
                        <Grid item xs={12}>
                          <Typography>
                            <Checkbox
                              color="primary"
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                            />
                            {e.heading}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Divider />

        <Grid className={classes.containerModify}>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Topic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item md={12} sm={12} xs={12}>
                <SearchBox searchHandler={e => setTopicText(e.target.value)} />

                {topic.map(e => {
                  return (
                    <>
                      <Grid>
                        <Grid item xs={12}>
                          <Typography>
                            <Checkbox
                              color="primary"
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                            />
                            {e.heading}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Divider /> */}

        <Grid className={classes.containerModify}>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Date</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item md={12} sm={12} xs={12}>
                <Grid>
                  <Box>
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="fromDate"
                          label="From"
                          value={formDateRes}
                          onChange={handleFromDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          maxDate={toDateRes}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="toDate"
                          label="To"
                          value={toDateRes}
                          onChange={handleToDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          minDate={formDateRes}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Divider />

        {/*  <Grid className={classes.containerModify}>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Graded / Upgraded
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item md={12} sm={12} xs={12}>
                <RadioGroup value={gradedRadio} onChange={radioButtonGraded}>
                  {GradedJson.map(e => {
                    return (
                      <>
                        <Grid>
                          <Grid item xs={12}>
                            <Typography>
                              <FormControlLabel
                                value={e.heading}
                                control={<Radio />}
                              />
                              {e.heading}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </RadioGroup>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>  <Divider />*/}

        {userDetails.Type === 'Faculty' && (
          <Grid className={classes.containerModify}>
            <Accordion
              expanded={expanded === 'panel6'}
              onChange={handleChange('panel6')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Published</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item md={12} sm={12} xs={12}>
                  <KenRadioGroup
                    value={publishedRadio}
                    // label={t('appearance:Show_the_users_picture')}
                    options={pubUnpubOptions}
                    onChange={newValue => {
                      radioButtonPublished(newValue);
                    }}
                    defaultValue={() => {
                      radioButtonPublished(pubUnpubOptions[0]?.value);
                      return pubUnpubOptions[0]?.value;
                    }}
                    color="primary"
                    name="publishedRadio"
                    variant="outline"
                  />
                  {/* <RadioGroup
                    value={publishedRadio}
                    onChange={radioButtonPublished}
                  >
                    {PublishedJson.map(e => {
                      return (
                        <>
                          <Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <FormControlLabel
                                  value={e.heading}
                                  control={<Radio />}
                                />
                                {e.heading}
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                  </RadioGroup> */}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
