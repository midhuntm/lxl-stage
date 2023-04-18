import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    minWidth: 210,
    height: '95%',
    maxWidth: 300
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function CourseCards(props) {
  const classes = useStyles();
  const { programs, click } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {programs.map((program) => (
          <Grid item xs key={program.CourseOfferingID}>
            <Card
              className={classes.root}
            >
              <CardActionArea
                onClick={() => click(program.CourseOfferingID)}
              >
                <CardContent>
                  <Typography variant="h6">
                    {program.hed__Course__cName}
                  </Typography>
                  <Typography color="textSecondary">
                    {program.ProgramName}
                  </Typography>
                  <Typography color="textSecondary">
                    {program.Name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

