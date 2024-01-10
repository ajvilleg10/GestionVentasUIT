function esDiaLaborable(fecha) {
  const diaSemana = fecha.day();
  return diaSemana >= 1 && diaSemana <= 5; // 0 es domingo, 6 es sábado
}

function calcularDiasLaborables(fechaInicio, fechaFin) {
  let contador = 0;
  let fechaActual = fechaInicio;

  while (fechaActual.isBefore(fechaFin)) {
    if (esDiaLaborable(fechaActual)) {
      contador++;
    }
    fechaActual = fechaActual.add(1, 'day');
  }

  return contador + 1;
}

export default calcularDiasLaborables;
