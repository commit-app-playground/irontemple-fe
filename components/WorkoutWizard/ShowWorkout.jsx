import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  dayList: {
    margin: "30px 0"
  }
}))

export default function ShowWorkout(props) {
  const styles = useStyles();
  const workout = props.workout;

  return (
    <div>
      <Typography align="center" variant="h5">This is your current workout.</Typography>
      <Typography align="center" variant="subtitle1">{`Workout name: ${workout.schedule.name}`}.</Typography>
      {Object.entries(workout.days).map(([key, day]) => {
        return (
          <Paper key={key} elevation={3} className={styles.dayList}>
            <Typography align="center" variant="subtitle2">{day.name}</Typography>
            <List dense={true}>
              {day.exercises.map((exercise, i) => {
                return (
                  <ListItem key={key + i}>
                    <ListItemText primary={exercise.name} item/>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )
      })}
      <Button variant="contained" color="primary" onClick={props.resetWorkout}>Clear saved workout.</Button>
    </div>
  );
}
