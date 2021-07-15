import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  header: {
    background: "#afafaf",
    color: "#242424"
  }
}))

export default function Main() {
  const styles = useStyles();

  return (
    <Grid container direction="column" spacing={0}>
      <Grid container item xs={0} className={styles.header} justifyContent="center">
        <Typography variant="h4">Irontemple</Typography>
      </Grid>
      <Grid container item xs={1}>
      </Grid>
    </Grid>
  )
}
