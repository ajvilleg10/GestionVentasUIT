import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, Select, MenuItem, TextField, Stack } from '@mui/material';
import SiguienteAccionModal from '../SiguienteAccionModal';
import { useCitasContactos } from 'hooks/vendedor/useGestionContactos';
import dayjs from 'dayjs';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { EmptyTable } from 'components/third-party/ReactTable';

const tipoCitasNoConcretadas = ["Seguimiento", "Referido", "Casual", "Servicio"];
const tipoCitas = ["Seguimiento", "Referido", "Casual", "Servicio", "Reagendada"];
const tiposCitasConcretadas = ['Nueva Obtenida', 'Referido', 'Casual', "Reagendada"]
const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];
const concretadas = ['SI', 'NO'];

const Citas = () => {

  var todayjs = dayjs();

  const { citaContactosBack, actualizarCitasBack } = useCitasContactos();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (citaContactosBack != null) {
      setCitas([...citaContactosBack]);
    }
  }, [citaContactosBack]);

  useEffect(() => {
    console.log(citas);
  }, [citas]);

  const handleSiguienteAccionAcceptance = (values, index) => {
    citas[index]['siguiente_accion'] = values['siguienteAccion'];
    citas[index]['actividad'] = values['actividad'];
    citas[index]["modificado"] = true;
    //setCitas([...citas]);
  };

  const getDate = (date) => {
    var formatDate = dayjs(date).format("DD/MM/YYYY HH:mm");
    return formatDate.toString();
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = (typeof name === 'string' ? name.split(",") : name);
    citas[index][key] = value;
    citas[index]["modificado"] = true;
    console.log(citas[index])
    console.log(name)
    //setCitas([...citas]);
  };

  const validateSiguienteAccion = (row, index) => {
    if (row["modificado"] && row["concretada"] === "NO" && (row["siguiente_accion"] === "" || !row["siguiente_accion"])) {
      throw new Error("Ingrese la siguiente accion en la linea " + (index + 1));
    }
  }

  const onSubmit = async (e) => {
    try {
      setCitas([...citas]);
      await Promise.all(
        citas.map(async (row, index) => {
          try {
            if (row["modificado"]) {
              //validateSiguienteAccion(row, index);

              await actualizarCitasBack(row);
            }
          }
          catch (e) {
            throw new Error("La cita ya no puede ser modificada");
          }

        })
      );
      dispatch(
        openSnackbar({
          open: true,
          message: 'Citas Actualizadas con Exíto',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (e) {
      dispatch(
        openSnackbar({
          open: true,
          message: e.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  }


  var today = new Date();

  const calculateMinDate = (fecha) => {
    if (today.getDay() === 1)
      return fecha.subtract(today.getHours(), 'hours').subtract(today.getMinutes(), 'minutes').subtract(today.getSeconds(), 'seconds');
    if (today.getDay() === 2)
      return fecha.subtract(today.getHours() + 24, 'hours').subtract(today.getMinutes(), 'minutes').subtract(today.getSeconds(), 'seconds');
    return fecha.subtract(48, 'hours');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell sx={{ minWidth: '210px' }} align="center">Fecha Sistema</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Fecha Registro</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Tipo Cita</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Fecha Hora Cita</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Direccion Cita</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Concretada</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Siguiente Accion</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Convocado Jefe de Ventas</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Asistencia Jefe Ventas</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Verificado Asistente de Ventas</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Fecha Verificado</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Comentarios</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Confirmacion de Asistencia del Vendedor</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Valoracion del Vendedor</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Explico el Servicio</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Valoracion del Servicio</TableCell>
              <TableCell sx={{ minWidth: '210px' }} align="center">Aplica Bono de Gestión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.length === 0 && (<EmptyTable msg={'No existen citas'} colSpan={17} height={'100px'} />)}
            {citas.length > 0 && (
              citas?.map((row, index) => {
                const isBefore = todayjs.isBefore(dayjs(row.fecha_cita));
                todayjs = dayjs();

                var pasoTiempo = false;
                /*if (row["concretada"] == null) {
                  const validador = todayjs.diff(row.fecha_cita, "hours") > 72 || today.getDay() < dayjs(row.fecha_cita).day;
                  if (validador)
                    row["concretada"] = "NO";
                  row["modificado"] = true;

                }*/

                const TipoCitaConcretada = (tiposCitasConcretadas.some(value => (value === row.tipo_cita)));


                if (!(row.bloqueado === true)) {
                  const registroConcretada = todayjs.diff(row.fecha_cita, "hours") > 48 || (today.getDay() === 0 ? 7 : today.getDay()) < (dayjs(row.fecha_cita).day() === 0 ? 7 : dayjs(row.fecha_cita).day());
                  console.log(dayjs(row.fecha_cita).day())
                  console.log(today.getDay() + " dia")
                  console.log(registroConcretada)
                  if (registroConcretada && (row["siguiente_accion"] === "" || row["siguiente_accion"] === null)) {
                    row["concretada"] = "NO";
                    row["modificado"] = true;
                    pasoTiempo = true;
                  }
                }

                console.log(isBefore + "isBefore");
                console.log(pasoTiempo + "pasoTiempo");
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                    <TableCell align="left" size="auto">
                      {getDate(row.fecha_sistema)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {getDate(row.fecha_registro)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <FormControl fullWidth>
                        {row.tipo_cita}
                      </FormControl>
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {getDate(row.fecha_cita)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {((isBefore && !(row["bloqueado"]) && (row["siguiente_accion"] === "" || row["siguiente_accion"] === null)) ? <TextField defaultValue={row.direccion}
                        name={[index, "direccion"]} onChange={onChange} /> : row.direccion)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <FormControl fullWidth>
                        {(isBefore || (row["bloqueado"]) || (row["siguiente_accion"] !== "" && row["siguiente_accion"] !== null) || pasoTiempo)
                          ? (row["concretada"] === true ? "SI" : "NO") :
                          <Select
                            id={`concretadaSelect${index + 1}`}
                            defaultValue={row.concretada}
                            name={[index, "concretada"]} onChange={onChange}
                            disabled={isBefore || (row["bloqueado"]) || !TipoCitaConcretada}
                          >
                            {concretadas?.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      </FormControl>
                    </TableCell>

                    <TableCell align="left" size="auto">
                      {((row.siguiente_accion && row.siguiente_accion === "Cita agendada") ? row["siguiente_accion"] :
                        <SiguienteAccionModal
                          row={row}
                          handleAcceptance={handleSiguienteAccionAcceptance}
                          siguientesAcciones={siguientesAcciones}
                          index={index}
                          tipoCitas={(isBefore && TipoCitaConcretada ? ["Reagendada"] : (TipoCitaConcretada ? tipoCitas : tipoCitasNoConcretadas))}
                          minDate={calculateMinDate(todayjs)}
                        />)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {((isBefore && !(row["bloqueado"]) && (row["siguiente_accion"] !== "" || row["siguiente_accion"] !== null)) ?
                        <FormControl fullWidth>
                          {(row.convocado_jv ? 'SI' : <Select
                            id={`concretadaSelect${row.id}`}
                            defaultValue={(row.convocado_jv ? 'SI' : 'NO')}
                            name={[index, "convocado_jv"]} onChange={onChange}>
                            {concretadas?.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>)}
                        </FormControl>
                        : (row.convocado_jv ? 'SI' : 'NO'))}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row.asistencia_jv != null ? (row.asistencia_jv ? 'SI' : 'NO') : null)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row.revisado ? 'SI' : 'NO')}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row.fecha_verificado ? getDate(row.fecha_verificado) : null)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.comentarios}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row.confirmacion_vend != null ? (row.confirmacion_vend ? 'SI' : 'NO') : null)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row?.verificacion?.valoracion_v}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row?.verificacion?.explic_serv != null ? (row?.verificacion?.explic_serv ? 'SI' : 'NO') : null)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row?.verificacion?.valoracion_s}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(row?.aplica_bono_v != null ? (row?.aplica_bono_v ? 'SI' : 'NO') : null)}
                    </TableCell>
                  </TableRow >
                );
              }))
            }
          </TableBody >
        </Table >
      </TableContainer >
      <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={3}>
        <Button variant="contained" type="submit" onClick={onSubmit}>Guardar</Button>
      </Stack>
    </>
  );
};

Citas.propTypes = {};

export default Citas;
