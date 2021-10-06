import { bookingStyles } from './BookingStyles/BookingsTemplate';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditButton from './EditButton';
import { Booking } from '../../interface/Requests';
import TimeDisplay from './TimeDisplay';

interface Props {
  bookings: Booking[];
  sectionName: string;
  updateStatusState: (id: string, status: string, sectionName: string) => void;
}

export default function ManageBookings({ bookings, sectionName, updateStatusState }: Props): JSX.Element {
  const pageClasses = bookingStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs className={pageClasses.sectionWrapper}>
            <Typography variant="body2" gutterBottom className={pageClasses.sectionHr}>
              {sectionName}
            </Typography>
          </Grid>
          <Grid item>
            {bookings.map((booking: Booking) => (
              <Paper variant="outlined" className={pageClasses.paperOutlineWrap} key={booking._id}>
                <Grid item container xs={12} sm>
                  <Grid item xs={9}>
                    <TimeDisplay endTime={booking.startDate} startTime={booking.startDate} />
                    <Typography variant="body2" className={pageClasses.nameWrapper}>
                      {/* TEMP IMG tags */}
                      {/* <Avatar alt="Remy Sharp" src="../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png" /> */}
                      <Box className={pageClasses.tempImg}></Box>
                      <Box className={pageClasses.bookingNameHr}>{booking?.sitterId}</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className={pageClasses.statusWrapper}>
                    <Typography variant="subtitle1" className={pageClasses.statusTxt.toUpperCase()}>
                      {booking.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={pageClasses.iconWrapper}>
                    <EditButton
                      sectionName={sectionName}
                      updateStatusState={updateStatusState}
                      requestId={booking._id}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
