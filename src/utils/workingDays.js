function esDiaLaborable(fecha) {
  const diaSemana = fecha.day();
  return diaSemana >= 1 && diaSemana <= 5; // 0 es domingo, 6 es sábado
}

// TODO: Recibir una lista con todos los feriados del anio, desde base o manualmente
function esFeriado(fecha) {
  // Anio nuevo y navidad
  if (fecha.month() === 0 && fecha.date() === 1) return true;
  if (fecha.month() === 11 && fecha.date() === 25) return true;
  return false;
}

function calcularDiasLaborables(fechaInicio, fechaFin) {

  let contador = 0;
  let fechaActual = fechaInicio;

  while (fechaActual.isBefore(fechaFin)) {

    // console.log(fechaActual);
    // console.log(esFeriado(fechaActual));

    if (esFeriado(fechaActual)) {
      return -1;
    } else if (esDiaLaborable(fechaActual)) {
      contador++;
    } 

    fechaActual = fechaActual.add(1, 'day');
  }

  return contador + 1;
}

export default calcularDiasLaborables;
