// import dayjs from 'dayjs';

export const compararFechas = (fecha1, fecha2) => {
  return fecha1.isSame(fecha2, 'day') && fecha1.isSame(fecha2, 'month') && fecha1.isSame(fecha2, 'year');
};

export const restarFechas = (fecha1, fecha2) => {
  return fecha2.diff(fecha1, 'day');
}

// const isSameDate = today.isSame(fechaAsistencia, 'day') && today.isSame(fechaAsistencia, 'month') && today.isSame(fechaAsistencia, 'year');
