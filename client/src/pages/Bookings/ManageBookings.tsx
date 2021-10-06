import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import BookingsTemplate from './BookingsTemplate';
import { Booking } from '../../interface/Requests';
import { bookingStyles } from './BookingStyles/BookingsTemplate';

interface Props {
  pastBookings: Booking[];
  currentBookings: Booking[];
  updateStatusState: (id: string, status: string, sectionName: string) => void;
}

export default function ManageBookings({ pastBookings, currentBookings, updateStatusState }: Props): JSX.Element {
  const pageClasses = bookingStyles();

  return (
    <Box className={pageClasses.text}>
      <Paper className={pageClasses.paper}>
        <BookingsTemplate
          updateStatusState={updateStatusState}
          sectionName={'current bookings'}
          bookings={currentBookings}
        />
        <BookingsTemplate updateStatusState={updateStatusState} sectionName={'past bookings'} bookings={pastBookings} />
      </Paper>
    </Box>
  );
}
