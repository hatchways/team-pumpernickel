import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { updateStatus } from '../../helpers/APICalls/request';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { editButtonStyles } from './BookingStyles/EditButton';
interface Props {
  requestId?: string;
  updateStatusState: (id: string, status: string, sectionName: string) => void;
  sectionName: string;
}

export default function EditButton({ requestId, updateStatusState, sectionName }: Props): JSX.Element {
  const pageClasses = editButtonStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickHandler = async (status: string) => {
    const { success } = await updateStatus(status, requestId);
    if (success) {
      const id = success['request']._id;
      if (sectionName === 'nextBooking') updateStatusState(id, status, 'nextBooking');
      else if (sectionName == 'current bookings') updateStatusState(id, status, 'currentBookings');
      else if (sectionName == 'past bookings') updateStatusState(id, status, 'pastBookings');
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Typography onClick={handleClick}>
        <SettingsIcon className={pageClasses.icon} />
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={pageClasses.popoverWrapper}>
          <Button onClick={() => onClickHandler('accepted')}>Accept</Button>
          <Button onClick={() => onClickHandler('declined')}>Decline</Button>
        </Box>
      </Popover>
    </Box>
  );
}
