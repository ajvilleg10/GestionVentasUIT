import dayjs from 'dayjs';

export default function formatDate(inputDateString) {
  // Parse the input date string using dayjs
  const inputDate = dayjs(inputDateString);

  // Format the date as "DD/MM/YYYY"
  return inputDate.format('DD/MM/YYYY');
}
