import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem, Stack, TextField } from '@mui/material';
import { useReferidos } from 'hooks/vendedor/useGestionContactos';
import Button from '@mui/material/Button';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

const Referidos = () => {

  const origenes = [
    'BCS',
    'Cita Nueva Concretada',
    'Cita Seguimiento',
    'Cita Cierre',
    'Cita Casual'];

  const { referidosBack, createReferidosBack } = useReferidos();
  const [referidos, setReferidos] = useState([]);
  const referido = {
    "nombre": "",
    "apellido": "",
    "celular": "",
    "parentesco": "",
    "origen": ""
  }

  useEffect(() => {
    if (referidosBack != null) {
      setReferidos([...referidosBack]);
      console.log(referidosBack);
    }

  }, [referidosBack]);

  const onChange = (e) => {
    const { name, value } = e.target;
    referido[name] = value;
  };

  const validarValores = () => {
    console.log(referido)
    if (referido["nombre"] === "" || referido["apellido"] === "" || referido["celular"] === "" || referido["parentesco"] === "" || referido["origen"] === "")
      throw new Error("Llene todos los campos");
    /*if (referido["apellido"].split(" ").length !== 2)
      throw new Error("Ingrese dos apellidos");*/
    referido["celular"] = referido["celular"].trim();
    if (isNaN(referido["celular"]) || referido["celular"].length < 9)
      throw new Error('Ingrese correctamente el numero celular');
  }
  const onSubmit = async () => {
    try {
      validarValores();
      await createReferidosBack(referido);

      dispatch(
        openSnackbar({
          open: true,
          message: 'Referido creado con Exíto',
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
        <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Celular</TableCell>
              <TableCell align="center">Parentesco</TableCell>
              <TableCell align="center">Origen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
              <TableCell align="left" size="small">
                <TextField
                  name={"nombre"} onChange={onChange} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"apellido"} onChange={onChange} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"celular"} onChange={onChange} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"parentesco"} onChange={onChange} />
              </TableCell>
              <TableCell align="left" size="auto">
                <FormControl fullWidth>
                  <Select name={'origen'} onChange={onChange}>
                    {origenes?.map((origen) => (
                      <MenuItem value={origen} key={origen.id}>
                        {origen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            {referidos?.map((row, index) => {
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                  <TableCell align="left" size="auto">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.apellido}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.celular}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.parentesco}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.origen}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={3}>
        <Button variant="contained" type="submit" onClick={onSubmit}>Guardar</Button>
      </Stack>
    </>
  );
};

Referidos.propTypes = {};

export default Referidos;
