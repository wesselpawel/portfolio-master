import moment from "moment";
import { convertToDate } from "./convertToDate";

export const checkReliability = async (uid: any, bookings: any[]) => {
  const userBookings = bookings.filter((booking) => booking.uid === uid);

  const numBookings = userBookings.length;

  if (numBookings > 2) {
    // If the user has more than 2 bookings, check their reliability based on dates
    const unreliableBookings = userBookings.filter((booking) => {
      const awaitingBookings = moment().isBefore(
        convertToDate({
          ...booking.time,
          day: booking.time.day.day,
          year: booking.time.day.year,
        })
      );
      return awaitingBookings;
    });

    if (unreliableBookings.length >= 2) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
