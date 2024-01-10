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
// import PropTypes from 'prop-types';
import SiguienteAccionModal from '../SiguienteAccionModal';
import { useCitasContactos } from 'hooks/vendedor/useGestionContactos';
import dayjs from 'dayjs';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';


const todayjs = dayjs();

const tipoCitas = ["Seguimiento", "Referido", "Casual", "Servicio", "Reagendada"];
const tiposCitasConcretadas = ['Nueva Obtenida', 'Referido', 'Casual', "Reagendada"]
const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];
const concretadas = ['SI', 'NO'];

const Citas = () => {

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
    setCitas([...citas]);
  };

  const getDate = (date) => {
    var formatDate = dayjs(date).format("DD/MM/YYYY HH:mm");
    return formatDate.toString();
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = name;
    citas[index][key] = value;
    citas[index]["modificado"] = true;
    setCitas([...citas]);
  };

  const onSubmit = async (e) => {
    try {
      await Promise.all(
        citas.map(async (row, index0) => {
          try {
            if (row["modificado"])
              await actualizarCitasBack(row);
          }
          catch (e) {
            throw new Error(e.message);
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Fecha Sistema</TableCell>
              <TableCell align="left">Fecha Registro</TableCell>
              <TableCell align="left">Tipo Cita</TableCell>
              <TableCell align="left">Fecha Hora Cita</TableCell>
              <TableCell align="left">Direccion Cita</TableCell>
              <TableCell align="left">Concretada</TableCell>
              <TableCell align="left">Siguiente Accion</TableCell>
              <TableCell align="left">Convocado Jefe de Ventas</TableCell>
              <TableCell align="left">Asistencia Jefe Ventas</TableCell>
              <TableCell align="left">Verificado Asistente de Ventas</TableCell>
              <TableCell align="left">Fecha Verificado</TableCell>
              <TableCell align="left">Comentarios</TableCell>
              <TableCell align="left">Confirmacion de Asistencia del Vendedor</TableCell>
              <TableCell align="left">Valoracion del Vendedor</TableCell>
              <TableCell align="left">Explico el Servicio</TableCell>
              <TableCell align="left">Valoracion del Servicio</TableCell>
              <TableCell align="left">Aplica Bono de Gestión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              citas?.map((row, index) => {
                const isBefore = todayjs.isBefore(dayjs(row.fecha_cita));
                console.log(isBefore);
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                    <TableCell align="left" size="small">
                      {index + 1}
                    </TableCell>
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
                      {(isBefore && !(row["bloqueado"]) ? <TextField defaultValue={row.direccion}
                        name={[index, "direccion"]} onChange={onChange} /> : row.direccion)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <FormControl fullWidth>
                        {(isBefore || (row["bloqueado"]) || !(tiposCitasConcretadas.some(value => (value === row.tipo_cita)))) ? (row["concretada"] ? "SI" : "NO") :
                          <Select
                            id={`concretadaSelect${index + 1}`}
                            defaultValue={row.concretada}
                            name={[index, "concretada"]} onChange={onChange}
                            disabled={isBefore || (row["bloqueado"]) || !(tiposCitasConcretadas.some(value => (value === row.tipo_cita)))}
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
                      {(row["bloqueado"] ? row["siguiente_accion"] : <SiguienteAccionModal
                        row={row}
                        handleAcceptance={handleSiguienteAccionAcceptance}
                        siguientesAcciones={siguientesAcciones}
                        disabled={(row["bloqueado"])}
                        index={index}
                        tipoCitas={isBefore ? ["Reagendada"] : tipoCitas}
                      />)}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {(isBefore && !(row["bloqueado"]) ?
                        <FormControl fullWidth>
                          {(row.convocado_jv ? 'SI' :<Select
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
                      {row.asistenciaJefeVentas}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.verificadoAV}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.fechaVerificado}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.comentarios}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.confirmacionAsitenciaVendedor}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.valoracionVendedor}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.explicoServicio}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.valoracionServicio}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.aplicaBonoGestion}
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={2}>
        <Button variant="contained" type="submit" onClick={onSubmit}>Guardar</Button>
      </Stack>
    </>
  );
};
Citas.propTypes = {};
export default Citas;
