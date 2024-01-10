

function reunionPersonalSemanalFormat(data) {
  const reuniones = data.map((item, index) => {

    const empleados = item.Empleados.map((empleado) => {

      return createParticipante(
        empleado.id,
        empleado.nombres,
        empleado.apellidos,
        empleado.Cuenta[0].TipoCuentum.nombre_tipo,
        (empleado.EmpleadoReunionPersonalSemanal.asistio || 0) && 1,
        (empleado.EmpleadoReunionPersonalSemanal.puntual_completa || 0) && 1
      )
    });

    return createReunion(
      item.id,
      index + 1,
      item.fecha_reunion,
      item.duracion,
      item.hora_desde,
      item.ActaMejoramiento.antecedentes,
      item.ActaMejoramiento.compromiso,
      item.ActaMejoramiento.meta,
      empleados,
      item.enviado
    );
  });

  return reuniones;

}
function reunionPersonalSemanalFormatItem(item, number) {
  const empleados = item.Empleados.map((empleado) => {
    return createParticipante(
      empleado.id,
      empleado.nombres,
      empleado.apellidos,
      empleado.Cuenta[0]?.TipoCuentum.nombre_tipo,
      empleado.EmpleadoReunionPersonalSemanal.asistio || 0,
      empleado.EmpleadoReunionPersonalSemanal.puntual_completa || 0
    )
  });

  const reunion = createReunion(
    item.id,
    number,
    item.fecha_reunion,
    item.duracion,
    item.hora_desde,
    item.ActaMejoramiento.antecedentes,
    item.ActaMejoramiento.compromiso,
    item.ActaMejoramiento.meta,
    empleados,
    item.enviado
  );
  return reunion;
}
function createParticipante(
  empleadoId, 
  empleadoNombres,
  empleadoApellidos, 
  nombreTipoCuenta, 
  asistio, 
  puntualCompleta
) {
  return {
    empleadoId,
    empleadoNombres,
    empleadoApellidos,
    nombreTipoCuenta,
    asistio,
    puntualCompleta
  }
}

// idReunion,
//   no,
//   fechaReunion,
//   duracion,
//   horaDesde,
//   empleados,
//   empleadoIdJefeVenta,
//   empleadoIdVendedor,
//   asistioJefeVenta,
//   puntualCompletaJefeVenta,
//   asistioVendedor,
//   puntualCompletaVendedor


function createReunion(
  idReunion,
  no,
  fechaReunion,
  duracion,
  horaDesde,
  antecedentes,
  compromiso,
  meta,
  empleados,
  enviado
) {
  return {
    idReunion,
    no,
    fechaReunion,
    duracion,
    horaDesde,
    antecedentes,
    compromiso,
    meta,
    empleados,
    enviado
  }
}

function createJefeconVendedores(jefes, vendedores) {
  const jefess = jefes.map((item) => {
    return {
      empleadoId: item.empleado_id,
      jefeVentaId: item.id,
      tipoCuenta: "Jefe de Venta",
      nombre: item.Empleado.nombres + ' ' + item.Empleado.apellidos
    }
  });
  // console.log('jefess', jefess);
  const vendedoress = vendedores.map((item) => {
    return {
      empleadoId: item.empleado_id,
      jefeVentaId: item.jefe_venta_id,
      tipoCuenta: "Vendedor",
      nombre: item.Empleado.nombres + ' ' + item.Empleado.apellidos
    }
  });

  // console.log('vendedoress', vendedoress);
  const jefeConVendedores = jefess.map((jefe) => {
    const vendedorOfJefe = vendedoress.filter((vendedor) => vendedor.jefeVentaId === jefe.jefeVentaId);
    // console.log('vendedorOfJefe', vendedorOfJefe);

    return {
      ...jefe,
      vendedores: vendedorOfJefe
    }
  });
  // console.log('jefeConVendedores', jefeConVendedores);
  return jefeConVendedores;
}

function dayMonthYearFormat(fecha_reunionn) {
  // 2023-09-10
  let date = fecha_reunionn.split('-');
  let year = date[0];
  let month = date[1];
  let day = date[2];

  // let dayMonthYear = new Date(fecha_reunionn).toLocaleString();
  // console.log('fecha_reunionn', fecha_reunionn);
  // let dayMonthYear = new Date(year, month - 1, day);
  // dayMonthYear = new Date(dayMonthYear);
  // console.log('dayMonthYear', dayMonthYear);
  // const day = String(dayMonthYear.getDate()).padStart(2, '0');
  // console.log('day', day);
  // const month = String(dayMonthYear.getUTCMonth()).padStart(2, '0');
  // console.log('month', month);
  // const year = dayMonthYear.getFullYear();
  // console.log('year', year);
  const fecha_reunion = [day, month, year].join('/');
  // console.log('fecha_reunion', fecha_reunion, date, day, month, year);

  return fecha_reunion
}

function timeShortFormat(time) {
  // 2023-09-28T17:42:36.000Z
  // console.log('time', time);
  // const duracion2 = new Date(time);
  // console.log('duracion2', duracion2);
  const duracion = new Date(time).toLocaleTimeString([], { hour12: false, timeStyle: 'short' });
  // console.log('duracion', duracion);

  return duracion
}

function reunionesSorted(reunionesOfCurrentUser) {
  const reunionesSorted = reunionesOfCurrentUser.toSorted((r1, r2) => {
    const rr1 = new Date(r1.fechaReunion);
    const rr2 = new Date(r2.fechaReunion);
  
    const [h1, m1] = r1.horaDesde.split("T")[1].split(':');
    const [h2, m2] = r2.horaDesde.split("T")[1].split(':');
    const hh1 = new Date(null, null, null, h1, m1);
    const hh2 = new Date(null, null, null, h2, m2);
    // console.log('compare', h1, m1, 'zz', hh1, hh2, r1.fechaReunion, rr1, rr2 , rr2 - rr1 == 0, rr2 - rr1);
    return rr2 - rr1 || hh1 - hh2
  });

  return reunionesSorted;
}

export { reunionPersonalSemanalFormat, reunionPersonalSemanalFormatItem, createJefeconVendedores, dayMonthYearFormat, timeShortFormat, reunionesSorted };