
export interface Booking {
  ownerId?: string;
  sitterId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string; 
  paid?: boolean;
  _id?: string;
}
export interface RequestApiDataSuccess {
  nextBooking: Booking;
  currentBookings: Booking[];
  pastBookings: Booking[];
}
  
export interface RequestApiData {
    error?: { message: string };
    success?: RequestApiDataSuccess;
}
  
export interface RequestStatusApiDataSuccess {
  request: any;
}

export interface RequestStatusApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}
