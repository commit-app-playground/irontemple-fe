import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ShowWorkout(props) {
  const workout = props.workout;

  return (
    <div>
      <Typography align="center" variant="h5">This is your current workout.</Typography>
      <Typography align="center" variant="subtitle1">{`Workout name: ${workout.schedule.name}`}.</Typography>
      {Object.entries(workout.days).map(([key, day]) => {
        console.log(key, day);
        return (
          <Paper key={key} elevation={3}>
            <div>{day.name}</div>
            <ul>
              {day.exercises.map((exercise, i) => {
                return (<li key={key + i}>{exercise.name}</li>);
              })}
            </ul>
          </Paper>
        )
      })}
      <Button variant="contained" color="primary" onClick={props.resetWorkout}>Clear saved workout.</Button>
    </div>
  );
}
