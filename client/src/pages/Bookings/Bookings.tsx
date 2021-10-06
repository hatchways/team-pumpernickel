import { useState, useEffect } from 'react';
import { getRequests } from '../../helpers/APICalls/request';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import React from 'react';
import Calendar from './Calendar';
import NextBookings from './NextBookings';
import ManageBookings from './ManageBookings';
import { RequestApiDataSuccess } from '../../interface/Requests';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  const resModel: RequestApiDataSuccess = {
    nextBooking: {},
    currentBookings: [],
    pastBookings: [],
  };
  const [requests, setRequest] = useState<RequestApiDataSuccess>(resModel);
  const returnRequestType = (success): RequestApiDataSuccess => success.resModel;

  const updateStatusState = (id: string, status: string, sectionName: string) => {
    const requestCopy = { ...requests };
    if (id == requestCopy.nextBooking?._id) {
      requestCopy.nextBooking.status = status;
      setRequest(requestCopy);
      return;
    }

    const index = requestCopy[sectionName].findIndex((booking) => booking._id === id);
    if (index >= 0) {
      requestCopy[sectionName][index].status = status;
      setRequest(requestCopy);
      return;
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const success = await getRequests();
      const resModelSuccess = returnRequestType(success);
      if (resModelSuccess) setRequest(resModelSuccess);
    };
    fetchRequests();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Box className={`${classes.root} ${classes.mt}`}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6} spacing={10}>
              <NextBookings nextBooking={requests.nextBooking} updateStatusState={updateStatusState} />
              <ManageBookings
                currentBookings={requests.currentBookings}
                pastBookings={requests.pastBookings}
                updateStatusState={updateStatusState}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Calendar currentBookings={requests.currentBookings} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
