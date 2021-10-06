import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    mt: {
      marginTop: '50px',
    },
    container: {
      backgroundColor: 'rgb(250,250,251)',
      padding: '35px',
    },
  }),
);

export default useStyles;
