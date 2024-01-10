import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Grid, MenuItem, Select, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { setId, setNumero } from 'store/reducers/contactoSeleccionado';
import { dispatch } from 'store';
import Button from '@mui/material/Button';
import { openSnackbar } from 'store/reducers/snackbar';

const origenes = [
  'BCS',
  'Cita Nueva Concretada',
  'Cita Seguimiento',
  'Cita Cierre',
  'Cita Casual'];

const ContactosTable = ({ data, showDetails, createFunction }) => {
  const [rows, setRows] = useState(data);
  const [contacto, setContacto] = useState({
    "nombres": '',
    "apellidos": '',
    "celular": '',
    'comentario': '',
    'origen': ''
  });

  const chipColor = (estado) => {
    switch (estado) {
      case 'Cliente':
        return 'success';
      case 'Prospecto':
        return 'info';
      case 'No interesado':
        return 'error';
      case 'Interesado':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const showContactoDetails = (contact) => {
    showDetails(contact.id);
    dispatch(setId({ id: contact?.id }));
  };

  useEffect(() => {
    console.log(data);
    setRows(data);
  }, [data]);

  const validateValues = () => {
    if (contacto["nombres"] === '' || contacto["apellidos"] === '' || contacto["celular"] === '' || contacto["origen"] === '' || contacto["comentario"] === '')
      throw new Error("Complete todos los campos");
    /*var nombre_completo = contacto["apellidos"].split(" ");
    if (nombre_completo.length < 2)
      throw new Error("Ingrese dos apellidos");*/
  }

  const transformarNombres = (e) => {
    //const nombre = contacto["apellidos"].split(" ");
    /*if (nombre.length !== 2)
      throw new Error('Ingrese dos Apellidos');*/
    //console.log("el celular es numero" + isNaN(contacto["celular"]))
    contacto["celular"] = contacto["celular"].trim();
    if (isNaN(contacto["celular"]) || contacto["celular"].length < 9)
      throw new Error('Ingrese correctamente el numero celular');
  };

  const submitValues = async () => {
    try {
      validateValues();
      transformarNombres();
      await createFunction(
        {
          "numero_celular": contacto["celular"],
          "comentarios": contacto["comentario"],
          "origen_contacto": contacto["origen"],
          "nombres": contacto["nombres"],
          "apellidos": contacto["apellidos"],
          "parentezco": "Relative",
          "estado_contacto_id": 2
        }
      );
      dispatch(
        openSnackbar({
          open: true,
          message: 'Contacto creado',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
    catch (e) {
      dispatch(
        openSnackbar({
          open: true,
          message: "Error al crear el contacto",
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }

    return null;

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    contacto[name] = value;
    setContacto({ ...contacto });
  }


  // filter
  //const VISIBLE_FIELDS = ['nombre', 'celular', 'comentario', 'origen de contacto', 'estado'];


  return (
    < >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell align="left">Nombres</TableCell>
              <TableCell align="left">Apellidos</TableCell>
              <TableCell align="left">Celular</TableCell>
              <TableCell align="left">Comentario</TableCell>
              <TableCell align="left">Origen de Contacto</TableCell>
              <TableCell align="left">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" size="small">
                <TextField
                  name={"nombres"} onChange={handleChange} value={contacto["nombres"]} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"apellidos"} onChange={handleChange} value={contacto["apellidos"]} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"celular"} onChange={handleChange} value={contacto["celular"]} />
              </TableCell>
              <TableCell align="left" size="small">
                <TextField
                  name={"comentario"} onChange={handleChange} value={contacto["comentario"]} />
              </TableCell>
              <TableCell align="left" size="small">
                <Select name={'origen'} onChange={handleChange}>
                  {origenes?.map((origen) => (
                    <MenuItem value={origen} key={origen.id}>
                      {origen}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell align="left" size="small">
              </TableCell>
            </TableRow>
            {rows?.map((row, index) => {
              const estadoColor = chipColor(row?.estado_contacto?.estado_contacto);
              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}
                  onClick={() => showContactoDetails(row)}
                >
                  <TableCell align="left" size="auto">
                    {row.nombres}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.apellidos}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.numero_celular}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.comentarios}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.origen_contacto}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <Grid >
                      <Chip sx={{ width: '100%' }} label={row?.estado_contacto?.estado_contacto} style={{ backgroundColor: (estadoColor === "warning" ? row?.color : null) }} color={estadoColor} />
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={2}>
        <Button variant="contained" type="submit" onClick={submitValues}>Guardar</Button>
      </Stack>
    </>
  );
};

ContactosTable.propTypes = {
  data: PropTypes.array,
  showDetails: PropTypes.func,
  createFunction: PropTypes.func
};

export default ContactosTable;


