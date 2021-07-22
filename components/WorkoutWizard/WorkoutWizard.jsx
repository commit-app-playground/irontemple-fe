import React, { useState, useEffect } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ClearIcon from '@material-ui/icons/Clear';

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
  },
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
      days: [
        {
          name: "Day A",
          exerciseCount: 5
        },
        {
          name: "Day B",
          exerciseCount: 5
        }
      ],
      rules: [
        {
          name: "One compound movement per muscle group.",
          fn: (exercise, day) => {
            return day.exercises.some((dayExercise) => {
              return dayExercise.compound && exercise.compound && dayExercise.target === exercise.target
            });
          }
        },
        {
          name: "Three compound movements max.",
          fn: (exercise, day) => {
            return [...day.exercises, exercise].filter((dayExercise) => dayExercise.compound).length > 3
          }
        },
        {
          name: "No conflicting muscle groups between compounds.",
          fn: (exercise, day) => {
            const conflicts = [
              ["chest", "back"],
              ["arms", "core"]
            ];

            const muscles = [...day.exercises, exercise].map((e) => e.target);

            return conflicts.some((conflict) => {
              return conflict.every((muscle) => muscles.includes(muscle));
            });
          }
        }
      ]
    }
  ];

  return (
    <>
      <Typography align="center" variant="h5">How often can you go to the gym?</Typography>
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        {schedules.map((schedule, i) => {
          return (
            <Grid item key={i}>
              <Button className={styles.scheduleButton} variant="outlined" onClick={() => props.setSchedule(schedule)}>{schedule.name}</Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  )
}

function DayConfiguration(props) {
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
        const workoutDay = workout.days.get(day.name);
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

function ShowWorkout(props) {
  const workout = props.workout;

  return (
    <div>
      <Typography align="center" variant="h5">This is your current workout.</Typography>
      <Typography align="center" variant="h5">{`Workout name: ${workout.schedule.name}`}.</Typography>
      <Paper>
        <div>Hello world</div>
        <ul>
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
        </ul>
      </Paper>
    </div>
  );
}
  
export default function WorkoutWizard() {
  const styles = useStyles();
  const [workout, setWorkout] = useState({
    schedule: null,
    days: new Map(),
    saved: false
  })

  useEffect(() => {
    const savedWorkout = window.localStorage.getItem("workout");
    if (savedWorkout) {
      setWorkout(JSON.parse(savedWorkout));
    }
  }, [])

  const setSchedule = (schedule) => {
    setWorkout({
      ...workout,
      schedule, 
      days: schedule.days.reduce((map, day) => {
        map.set(day.name, {
          name: day.name,
          exercises: Array(day.exerciseCount).fill({})
        });

        return map;
      }, new Map())
    })
  };

  const resetWorkout = () => {
    setWorkout({
      schedule: null,
      days: new Map(),
      saved: false
    });
  }

  let Component;

  if (workout.saved) {
    Component = ShowWorkout;
  } else if(workout.schedule) {
    Component = DayConfiguration;
  } else {
    Component = ScheduleSelector;
  }

  return (
    <Container className={styles.container}>
      <Component
        workout={workout}
        setSchedule={setSchedule}
        updateWorkout={(changes) => setWorkout({...workout, ...changes})}
      />
    </Container>
  )
}
