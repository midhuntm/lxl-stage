import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import './examPage.css';

const useStyles = makeStyles((theme) => ({
  breadCrumbWrapper: {
    margin: '15px 0',
  },
  header: {
    background: '#ffffff',
    color: theme.palette.KenColors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#092682',
    margin: '24px 0 16px 4px',
  },
  headTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#092682',
    marginLeft: '4px',
  },
  subHeaderTitle: {
    width: '100%',
  },
  addButton: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      borderBottom: '1px solid white',
    },
  },
  mainActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0 1rem',
  },
  error: {
    color: '#FFFFFF',
    background: '#EB5757',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  normal: {
    color: '#FFFFFF',
    background: '#27AE60',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  publishGenerate: {
    color: '#FFFFFF',
    background: '#979797',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  publishView: {
    color: '#FFFFFF',
    background: '#F2994A',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  Blue: {
    color: '#FFFF',
    background: '#03248F',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  Green: {
    color: '#FFFF',
    background: '#27AE60',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
    width: '102px',
  },
  medium: {
    color: '#FFFFFF',
    background: '#F2994A',
    width: '102px',
    borderRadius: 15,
    fontSize: '10px',
    fontWeight: 'bold',
    margin: '0 5px',
  },
  errorText: {
    color: '#F14B2D',
  },
  greenText: {
    color: '#27AE60',
  },
  gridKenClass: {
    '&  table tbody tr td ': {
      padding: '5px',
    },
    '&  table thead tr th ': {
      fontWeight: 'bold',
      color: '#061938',
    },
  },
}));

const ExamOfficeBoard = () => {
  const classes = useStyles();
  const annonuncement = [
    {
      id: 1,
      title: 'Re-schedulement Examination',
      date: '13/01/2021  11 AM',
      description1: `The Chartered Accountants Examinations, December 2021 was the last examinations for the students
        pertaining to Old Course and further they were to convert to the New Course for appearing in the
        Chartered Accountants Examinations, May 2022. It is observed that certain students pertaining to Old
        Course could not convert to New Course resulting in non submission of online examination Application
        forms for Chartered Accountants Examinations, May 2022`,
      description2: `Further, since Foundation Course Examination is re-scheduled from May 2022 to June 2022, some
        students may now be desirous to fill the online examination application form for Chartered Accountants
 Foundation Examinations, June 2022`,
    },
    {
      id: 2,
      title: 'Results of the CA Intermediate Examination',
      date: '13/01/2021  11 AM',
      description1: `Arrangements have also been made for the candidates of Intermediate Examination (Old Course & New
          Course) desirous of having results on their e-mail addresses to register their requests at the website i.e.
          icaiexam.icai.org from 24th February 2022. All those registering their requests will be provided their
          results through e-mail on the e-mail addresses registered as above immediately after the declaration of
          the result`,
      description2: '',
    },
    {
      id: 3,
      title: 'Important Announcement CA Examinations',
      date: '13/01/2021  11 AM',
      description1: `No. 13-CA (EXAM)/M/2022: In pursuance of Regulation 22 of the Chartered Accountants Regulations,
        1988, the Council of the Institute of Chartered Accountants of India is pleased to announce that the next
        Chartered Accountants Foundation, Intermediate and Final Examinations will be held on the dates and
        places which are given below provided that sufficient number of candidates offer themselves to appear
        from each of the below mentioned places`,
      description2: `Similarly, Examination in Post Qualification Course under Regulation 204, viz.: International Taxation –
        Assessment Test (INTT – AT) (which is open to the members of the Institute) will be held on the dates
        and places (centres in India only) which are given below provided that sufficient number of candidates
        offer themselves to appear from each of the below mentioned places`,
    },
  ];

  const faqArray = [
    {
      id: 1,
      question: 'Can a candidate register for more than one level at a time?',
      answer:
        ' No, at any point of time, a candidate can hold a valid registration, for one Level only',
    },
    {
      id: 2,
      question:
        'What are the different methods of making payment for Registration?',
      answer: `There are three methods available:
      (i) Online : Net Banking, Debit Card, Credit Card.
      (ii) CSC-SPV .
      (iii) NEFT/RTGS .`,
    },
    {
      id: 3,
      question: 'What is paper pattern entrance exam ?',
      answer: `A: Section IA- This section will be conducted in 13 Languages. Students can pick any one of these 13 languages. 40 questions including reading comprehension to be attempted out of 50 in each language.

      Section IB – There will 19 Languages and any one of these languages can be chosen. The question type of this section is similar to section IA.
      
      Section II – There are 27 Domains specific subjects being offered under this Section. A candidate may choose a maximum of Six Domains as desired by the applicable University or Universities. There will be MCQ Based Questions on NCERT Class XII syllabus.`,
    },
  ];
  const [desc, setDesc] = useState(annonuncement[0]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" className={classes.title}>
        Exam Office Bulletin Board & FAQ
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="exam-detail-block-faq">
            <List>
              {annonuncement.map((e, index) => {
                return (
                  <ListItem
                    style={{ marginBottom: '10px', backgroundColor: '#D7DEE9', cursor: 'pointer' }}
                  >
                    <ListItemText
                      onClick={() => setDesc(e)}
                      primary={e.title}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>
        {desc != '' ? (
          <Grid item xs={12} md={6}>
            <div className="exam-detail-block">
              {' '}
              <div className="exam-detail-block-inner">
                <h5>{desc.title}</h5>
                <h6>{desc.date}</h6>
                <p>{desc.description1}</p>
                <p>{desc.description2}</p>
              </div>
            </div>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <div className="faq-section">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <h5 className="faq-title">FAQ</h5>
          </Grid>
        </Grid>
        {faqArray.map((ele) => {
          return (
            <Accordion className="accordion-main">
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className="accordion-part"
              >
                {ele.question}
              </AccordionSummary>

              <AccordionDetails>{ele.answer}</AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Box>
  );
};

export default ExamOfficeBoard;
