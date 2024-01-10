/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import {
  Grid,
  List,
  ListItem,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';


// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';
import { useConfBonificacionGestionVendedor } from 'hooks/administrador/useConfBonificacionGestion';
import DialogTitle from 'themes/overrides/DialogTitle';
import { useSelector } from 'react-redux';
import { useReferidosExist } from 'hooks/vendedor/useGestionContactos';

const today = dayjs();
const validationSchema = yup.object({
  nombre: yup.string().required('Debe llenar el campo'),
  parentezco: yup.string().required('Debe llenar el campo'),
  celular: yup.string().required('Debe llenar el campo'),
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [

  {
    id: 'nombre',
    align: 'center',
    disablePadding: false,
    label: 'Nombre'
  },
  {
    id: 'apellido',
    align: 'center',
    disablePadding: false,
    label: 'Apellidos'
  },
  {
    id: 'parentezco',
    align: 'center',
    disablePadding: true,
    label: 'Parentezco'
  },
  {
    id: 'numero',
    align: 'center',
    disablePadding: true,
    label: 'Numero Telefónico'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const ReferidosModal = ({ handleAcceptance, row, disabled }) => {

  const { checkReferido } = useReferidosExist();
  const [open, setOpen] = useState(false);
  const [referido, setReferido] = useState('');
  const [referidos, setReferidos] = useState([{
    primerNombre: '',
    apellidos: '',
    parentezco: '',
    numero: '',
  }]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: referidos,
    validationSchema,
    onSubmit: async (values) => {
      try {
        transformarNombres();
        await validarNumeros();
        handleAcceptance({ "referidos": referidos, "referido": referido });
        setOpen(false);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Referidos guardados con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(referidos);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);
        dispatch(
          openSnackbar({
            open: true,
            message: error.message,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      } finally {
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
      }
    },
  });

  const onReferidoChange = (event, id) => {
    setReferido(event.target.value);
    if (event.target.value === 'SI') {
      setOpen(true);
    } else {
      handleAcceptance({ "referidos": {}, "referido": 'NO' });
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = name.split(",");
    referidos[index][key] = value;
    setReferidos([...referidos]);
  };

  const transformarNombres = (e) => {
    referidos.map((row, index) => {
      console.log(referidos);
      if ((row["primerNombre"] === '' && row["apellidos"] === '' && row["parentezco"] === '' && row["numero"] === '') && (referidos.length !== 1))
      return;
      else if (row["primerNombre"] === '' || row["apellidos"] === '' || row["parentezco"] === '' || row["numero"] === '')
        throw new Error('Llene todos los campos');
      //const apellido = row["apellidos"].split(" ");
      /*if (apellido.length !== 2)
        throw new Error('Ingrese dos Apellidos');*/
      row["numero"] = row["numero"].trim();
      if (isNaN(row["numero"]) || row["numero"].length < 9)
        throw new Error('Ingrese correctamente el numero celular');
    });
  };

  const validarNumeros = async () => {
    try {
      const posts0 = await Promise.all(
        referidos.map(async (row0, index0) => {
          try {
            const posts1 = await Promise.all(referidos.map(async (row1, index1) => {
              try {
                if (row0["primerNombre"] === '' && row0["apellidos"] === '' && row0["parentezco"] === '' && row0["numero"] === '')
                  return;
                const existe = await checkReferido(row0["numero"]);
                if (existe) {
                  throw new Error('El numero ya existe');
                }
                if (index0 !== index1 && row0["numero"] === row1["numero"])
                  throw new Error('Ingrese numeros diferentes');
              }
              catch (e) {
                throw new Error(e.message);
              }
            }))
          }
          catch (e) {
            throw new Error(e.message);
          }

        })
      );
    }
    catch (e) {
      console.log("espera")
      throw new Error(e);
    }
  };

  const onClose = () => {
    setReferidos([{
      nombre: '',
      parentezco: '',
      celular: '',
    }]);
    setOpen(false);
  }

  return (
    <div>
      <FormControl fullWidth>
        <Select
          id={`referidoSelect${row.id}`}
          defaultValue={row.referidos}
          onChange={onReferidoChange}
          disabled={disabled}
        >
          <MenuItem value={"SI"} key={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"} key={"NO"}>NO</MenuItem>
        </Select>
      </FormControl>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} onChange={handleChange}>
            <Box mt={2}>
              <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                <Table>
                  <OrderTableHead />
                  <TableBody>
                    {formik.values && (formik.values.map((nivel, index) => {
                      return (
                        <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              id="Nombre"
                              name={[index, "primerNombre"]}
                              value={nivel.primerNombre}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              id="Apellidos"
                              name={[index, "apellidos"]}
                              value={nivel.apellidos}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              id="parentezco"
                              name={[index, "parentezco"]}
                              value={nivel.parentezco}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              id="numero"
                              name={[index, "numero"]}
                              value={nivel.numero}
                              onChange={handleChange}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    }))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="contained" type="button" onClick={() => {
                  const items = [...referidos];
                  items.push({
                    primerNombre: '',
                    apellidos: '',
                    parentezco: '',
                    numero: '',
                  })
                  setReferidos(items)
                }}>
                  Agregar
                </Button>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </form>
        </DialogContent>
      </Dialog >
    </div>
  );
};

export default ReferidosModal;