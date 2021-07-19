import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import exercises from '/constants/exercises'

const useStyles = makeStyles(() => ({
  container: {
    padding: "16px"
  },
  scheduleContainer: {
    padding: "48px"
  },
  scheduleButton: {
    width: "100%",
    fontSize: "18px",
    padding: "15px",
    marginBottom: "40px"
  }
}))

function ScheduleSelector(props) {
  const styles = useStyles();
  const schedules = [
    {
      name: "5 days a week",
      days: ["Day A", "Day B", "Day C"]
    },
    {
      name: "4 days a week",
      days: ["Day A", "Day B"]
    },
    {
      name: "3 days a week",
      days: ["Day A", "Day B"]
    }
  ];

  return (
    <>
      <Typography align="center" variant="h5">How often can you go to the gym?</Typography>
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        {schedules.map((schedule, i) => {
          return (
            <Grid item key={i}>
              <Button className={styles.scheduleButton} variant="outlined" onClick={() => props.updateWorkout({ schedule }) }>{schedule.name}</Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  )
}

function RegimeSelector() {
  const styles = useStyles();

  return (
    <>
      <Typography align="center" variant="h5">Configure your days.</Typography>
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        <Grid item>
          <Button className={styles.scheduleButton} variant="outlined">Day A</Button>
        </Grid>
        <Grid item>
          <Button className={styles.scheduleButton} variant="outlined">Day B</Button>
        </Grid>
      </Grid>
    </>
  )
}

function DayConfiguration(props) {
  const styles = useStyles();
  const workout = props.workout;

  console.log(workout);
  console.log(workout.schedule.days);

  const days = ["Day A"];

  return (
    <>
      <Typography align="center" variant="h5">Configure your days.</Typography>
      {workout.schedule.days.map((day, i) => {
        return (
          <Accordion>
            <AccordionSummary>
              <Typography align="center" variant="h5">{day}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select>
                {exercises.catalog.map((exercise, i) => {
                  return (
                    <MenuItem key={i} value={exercise.name}>{exercise.name}</MenuItem>
                  );
                })}
              </Select>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default function WorkoutWizard() {
  const styles = useStyles();
  const [workout, setWorkout] = useState({
    schedule: null,
    days: []
  });

  const Component = workout.schedule ? DayConfiguration : ScheduleSelector

  return (
    <Container className={styles.container}>
      <Component workout={workout} updateWorkout={(changes) => setWorkout({...workout, ...changes})}/>
    </Container>
  )
}

/*
  
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        {days.map((day, i) => {
          return (
            <Grid item key={i}>
              <Button>{day}</Button>
              <Drawer anchor="bottom" open={true}>
                <Select>
                  {exercises.catalog.map((exercise, i) => {
                    return (
                      <MenuItem key={i} value={exercise.name}>{exercise.name}</MenuItem>
                    );
                  })}
                </Select>
              </Drawer>
            </Grid>
          )
        })}
      </Grid>
*/