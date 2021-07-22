import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import WorkoutWizard from '../components/WorkoutWizard';

const useStyles = makeStyles(() => ({
  container: {
    height: "100%"
  },
  header: {
    background: "#6998ff",
    color: "#ffffff",
    height: "45px"
  },
  content: {
    flex: 1,
    overflow: "scroll"
  }
}))

export default function Main() {
  const styles = useStyles();

  return (
    <Grid container direction="column" spacing={0} className={styles.container} >
      <Grid container item xs={false} className={styles.header} justifyContent="center">
        <Typography variant="h4">Irontemple</Typography>
      </Grid>
      <Grid container item xs={12} className={styles.content}>
        <WorkoutWizard />
      </Grid>
    </Grid>
  )
}
