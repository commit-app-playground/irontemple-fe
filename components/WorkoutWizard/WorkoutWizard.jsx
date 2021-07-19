import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    padding: "15px"
  }
}))

function ScheduleSelector(props) {
  const styles = useStyles();

  return (
    <>
      <Typography align="center" variant="h5">How often can you go to the gym?</Typography>
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        <Grid item>
          <Button className={styles.scheduleButton} variant="outlined" onClick={() => props.setA(true) }>5 days a week</Button>
        </Grid>
        <Grid item>
          <Button className={styles.scheduleButton} variant="outlined">4 days a week</Button>
        </Grid>
        <Grid item>
          <Button className={styles.scheduleButton} variant="outlined">3 days a week</Button>
        </Grid>
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

  return (
    <>
      <Typography align="center" variant="h5">Configure your days.</Typography>
      <Grid container direction="column" className={styles.scheduleContainer} justifyContent="center">
        <Grid item>
          <Select>
            {
              exercises.catalog.map((exercise, i) => {
                return (
                  <MenuItem key={i} value={exercise.name}>{exercise.name}</MenuItem>
                );
              })
            }
          </Select>
        </Grid>
      </Grid>
    </>
  )
}

export default function WorkoutWizard() {
  const styles = useStyles();
  const [a, setA] = useState(false);

  return (
    <Container className={styles.container}>
      { a ? <DayConfiguration/> : <ScheduleSelector setA={setA}/> }
    </Container>
  )
}
