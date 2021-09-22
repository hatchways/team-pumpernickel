import 'date-fns';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import BookingsTemplate from './BookingsTemplate';
import { bookingStyles } from './BookingStyles/BookingsTemplate';

interface Props {
  pastBookings: any;
  currentBookings: string;
}

export default function ManageBookings({ pastBookings, currentBookings }: Props): JSX.Element {
  const pageClasses = bookingStyles();

  return (
    <Box className={pageClasses.text}>
      <Paper className={pageClasses.paper}>
        <BookingsTemplate sectionName={'CURRENT BOOKINGS'} bookings={currentBookings} />
        <BookingsTemplate sectionName={'PAST BOOKINGS'} bookings={pastBookings} />
      </Paper>
    </Box>
  );
}
