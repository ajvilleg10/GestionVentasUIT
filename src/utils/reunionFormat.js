

function reunionPersonalSemanalFormat(data) {
  const reuniones = data.map((item, index) => {
    
    const empleados = item.Empleados.map((empleado) => {
      return createParticipante(
        empleado.nombres + ' ' + empleado.apellidos,
        empleado.Cuenta[0].TipoCuentum.nombre_tipo,
        empleado.EmpleadoReunionPersonalSemanal.asistio,
        empleado.EmpleadoReunionPersonalSemanal.puntual_completa
        )
      });
      
      
    // here  convert datetime from UTc to GMT local time zone .
    const hora_desde = new Date(item.hora_desde).toLocaleTimeString([], {hour12: false, timeStyle: 'short'});
    const duracion = new Date(item.duracion).toLocaleTimeString([], {hour12: false, timeStyle: 'short'});
    
    return createReunion(
      item.id,
      index + 1,
      item.fecha_reunion,
      duracion,
      hora_desde,
      empleados
    );
  });

  return reuniones;

}
function reunionPersonalSemanalFormatItem(item, number) {
  const empleados = item.Empleados.map((empleado) => {
    return createParticipante(
      empleado.nombres + ' ' + empleado.apellidos,
      empleado.Cuenta[0].TipoCuentum.nombre_tipo,
      empleado.EmpleadoReunionPersonalSemanal.asistio,
      empleado.EmpleadoReunionPersonalSemanal.puntual_completa
    )
  });
  const reunion = createReunion(
    item.id,
    number,
    item.fecha_reunion,
    item.duracion,
    item.hora_desde,
    empleados
  );
  return reunion;
}
function createParticipante(empleadoName, nombreTipoCuenta, asistio, puntualCompleta) {
  return {
      empleadoName,
      nombreTipoCuenta,
      asistio,
      puntualCompleta
    }
}
function createReunion(idReunion, no, fechaReunion, duracion, horaDesde, empleados) {
  return {
    idReunion,
    no,
    fechaReunion,
    duracion,
    horaDesde,
    empleados
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
    console.log('vendedorOfJefe', vendedorOfJefe);

    return {
      ...jefe,
      vendedores: vendedorOfJefe
    }
  });
  // console.log('jefeConVendedores', jefeConVendedores);
  return jefeConVendedores;
}

export { reunionPersonalSemanalFormat, reunionPersonalSemanalFormatItem, createJefeconVendedores };