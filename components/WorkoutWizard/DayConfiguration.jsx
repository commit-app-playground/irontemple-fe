import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import ClearIcon from '@material-ui/icons/Clear';

import exercises from '/constants/exercises'

const useStyles = makeStyles(() => ({
  exerciseList: {
    flexDirection: "column"
  },
  exerciseSelect: {
    marginBottom: "20px"
  },
  clearIcon: {
    verticalAlign: "middle"
  },
  dayAccordion: {
    margin: "30px 0"
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DayConfiguration(props) {
  const styles = useStyles();
  const workout = props.workout;
  const [dialogOpen, setDialogOpen] = React.useState({
    message: null,
    open: false
  });

  const selectExercise = (day, index) => (event) => {
    const exercise = exercises.find((e) => e.name === event.target.value);
    const brokenRule = workout.schedule.rules.find((rule) => rule.fn(exercise, day));

    if (brokenRule) {
      setDialogOpen({ message: brokenRule.name, open: true });
    } else {
      day.exercises[index] = exercise;
      props.updateWorkout(workout);
    }
  }

  const resetExercise = (day, index) => () => {
    day.exercises[index] = {};
    props.updateWorkout(workout);
  }

  const saveWorkout = () => {
    window.localStorage.setItem("workout", JSON.stringify({...workout, saved: true}));
    props.updateWorkout({ saved: true });
  }

  return (
    <>
      <Typography align="center" variant="h5">Configure your days.</Typography>
      {workout.schedule.days.map((day, i) => {
        const workoutDay = workout.days[day.name];
        const selectedExercises = workoutDay.exercises.map((e) => e.name);

        return (
          <Accordion key={i} className={styles.dayAccordion}>
            <AccordionSummary>
              <Typography align="center" variant="h5">{day.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.exerciseList}>
              {workoutDay.exercises.map((workoutExercise, i) => {
                return (
                  <div key={`${day.name}-sel${i}`}>
                    {workoutExercise.name && <ClearIcon className={styles.clearIcon} onClick={resetExercise(workoutDay, i)}/>}
                    <Select className={styles.exerciseSelect} value={workoutExercise.name || ''} onChange={selectExercise(workoutDay, i)} displayEmpty={true}>
                      {exercises.map((exercise, i) => {
                        return (
                          <MenuItem
                            key={`${day.name}-ex${exercise.name}`}
                            value={exercise.name}
                            name={exercise.name}
                            disabled={selectedExercises.includes(exercise.name)}
                          >
                            {exercise.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                )
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
      <Button variant="contained" color="primary" onClick={saveWorkout}>Save</Button>
      <Dialog
        open={dialogOpen.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Conflict found with your selected exercise."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogOpen.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDialogOpen({ message: null, open: false })}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
