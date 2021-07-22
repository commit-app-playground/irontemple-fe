import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import schedules from '/constants/schedules'

const useStyles = makeStyles(() => ({
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


export default function ScheduleSelector(props) {
  const styles = useStyles();
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
