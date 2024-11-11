/**
 * @description format date
 * @param date
 * @returns string representation of `date`
 */

export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  const todaysDay = newDate.getDay();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[newDate.getMonth()];

  return `${
    todaysDay < 10 ? "0" + todaysDay : todaysDay
  } ${month} ${newDate.getFullYear()}`;
};

/**
 * @description format time
 * @param minutes
 * @returns string representation of `time`
 */
export const formatTime = (minutes: number): string => {
  const formattedMinutes = +minutes.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    return `${Math.floor(formattedMinutes / 60)}h ${formattedMinutes % 60}m`;
  }
};
