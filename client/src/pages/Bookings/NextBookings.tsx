import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import EditButton from './EditButton';
import { Booking } from '../../interface/Requests';
import TimeDisplay from './TimeDisplay';
import { nextBookingClasses } from './BookingStyles/NextBooking';

interface Props {
  nextBooking: Booking;
  updateStatusState: (id: string, status: string, sectionName: string) => void;
}

export default function NextBookings({ nextBooking, updateStatusState }: Props): JSX.Element {
  const pageClasses = nextBookingClasses();

  return (
    <Box className={pageClasses.wrapper}>
      <Paper className={pageClasses.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom className={pageClasses.sectionHr}>
                  your next booking
                </Typography>
                {nextBooking?.startDate ? (
                  <TimeDisplay endTime={nextBooking.startDate} startTime={nextBooking.startDate} />
                ) : (
                  <Typography gutterBottom variant="subtitle1">
                    No upcoming booking
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2" className={pageClasses.nextBookNameWrapper}>
                  {/* TEMP img tags */}
                  {/* <Avatar alt="Remy Sharp" src="../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png" /> */}
                  <Box className={pageClasses.tempImg}></Box>
                  <Box className={pageClasses.nextBookNameHr}>{nextBooking?.sitterId}</Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <EditButton
                sectionName={'nextBooking'}
                updateStatusState={updateStatusState}
                requestId={nextBooking?._id}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
