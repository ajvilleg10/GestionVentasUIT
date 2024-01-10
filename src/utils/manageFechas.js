import dayjs from 'dayjs';
import { REUNION } from "./constants";

export const compararFechas = (fecha1, fecha2) => {
  return fecha1.isSame(fecha2, 'day') && fecha1.isSame(fecha2, 'month') && fecha1.isSame(fecha2, 'year');
};

export const restarFechas = (fecha1, fecha2) => {
  return fecha2.diff(fecha1, 'day');
}

export const getDates = (startDate, endDate, date, type) => {

  let current = dayjs(startDate);
  const today = dayjs();
  const end = dayjs(endDate);
  const dates = [];

  while (current.isBefore(end) || compararFechas(current, end)) {

    if (current.day() === date) {
      dates.push(current.format('YYYY-MM-DD'));

      if (type === REUNION.Quincenal) {
        current = current.add(14, 'day');
      } else if (type === REUNION.Mensual) {
        if (current.startOf('month').isBefore(today)) dates.pop();
        current = current.add(1, 'month').startOf('month');
      } else if (type === REUNION.Semanal) {
        current = current.add(1, 'day');
      }

    } else {
      current = current.add(1, 'day');
    }

  }

  return dates;

};
