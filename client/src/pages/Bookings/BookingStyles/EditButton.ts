import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const editButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    icon: {
      fontSize: '15px',
      color: theme.palette.text.secondary,
    },
    popoverWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);
