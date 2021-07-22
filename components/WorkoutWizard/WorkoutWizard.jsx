import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DayConfiguration from './DayConfiguration'
import ScheduleSelector from './ScheduleSelector'
import ShowWorkout from './ShowWorkout'

import exercises from '/constants/exercises'
import schedules from '/constants/schedules'

const useStyles = makeStyles(() => ({
  container: {
    padding: "16px"
  }
}))

export default function WorkoutWizard() {
  const styles = useStyles();
  const [workout, setWorkout] = useState({
    schedule: null,
    days: {},
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
        map[day.name] = {
          name: day.name,
          exercises: Array(day.exerciseCount).fill({})
        }

        return map;
      }, {})
    })
  };

  const resetWorkout = () => {
    window.localStorage.removeItem("workout");
    setWorkout({
      schedule: null,
      days: {},
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
        resetWorkout={resetWorkout}
      />
    </Container>
  )
}
