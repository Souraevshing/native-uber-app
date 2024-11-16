/**
 * @description format time
 * @param minutes
 * @returns string representation of `time`
 */
export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0);

  console.log(formattedMinutes);

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

/**
 * @description format date
 * @param date
 * @returns string representation of `date`
 */

export function formatDate(date: string): string {
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
}
