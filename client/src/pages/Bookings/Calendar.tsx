import 'date-fns';
import useStyles from './useStyles';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

interface Props {
  currentBookings: any[];
}
export default function Calendar({ currentBookings }: Props): JSX.Element {
  const classes = useStyles();
  const selectedDates = currentBookings.map((booking) => new Date(booking.startDate));

  return (
    <Box className={'calendarWrapper'}>
      <Paper className={classes.paper}>
        <MultipleDatesPicker
          readOnly={true}
          open={true}
          selectedDates={selectedDates}
          onSubmit={(dates: any) => console.log('selected dates', dates)}
        />
      </Paper>
    </Box>
  );
}
