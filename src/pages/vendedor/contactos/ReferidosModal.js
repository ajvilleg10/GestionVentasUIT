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

const today = dayjs();

const validationSchema = yup.object({
  nombre: yup.string(),
  parentezco: yup.string(),
  celular: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
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


const ReferidosModal = () => {

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { bonVendedor, createBonVendedor } = useConfBonificacionGestionVendedor();
  const [niveles, setNiveles] = useState([{
    nombre: '',
    parentezco: '',
    celular: '',
  }]);

  useEffect(() => {
    if (bonVendedor != null && bonVendedor.length >= 0) {
      setNiveles([...bonVendedor]);
      setIsUserDataLoaded(true);
    } else if (bonVendedor != null && bonVendedor.length === 0) {
      setIsUserDataLoaded(true);
    }
  }, [bonVendedor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: niveles,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createBonVendedor(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Referidos agregados con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(niveles);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [index, key] = name.split(",");
    niveles[index][key] = value;
    setNiveles([...niveles]);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <Box mt={2}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
            <Table>
              <OrderTableHead />
              <TableBody>
                {formik.values && (formik.values.map((nivel, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          id="Nombre"
                          name={[index, "nombre"]}
                          value={nivel.nombre}
                          onChange={handleChange}
                          inputProps={{ min: 1 }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField

                          fullWidth
                          id="parentezco"
                          name={[index, "parentezco"]}
                          value={nivel.parentezco}
                          onChange={handleChange}
                          defaultValue={nivel.parentezco}
                          inputProps={{ min: 1 }}

                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          type="number"
                          fullWidth
                          id="numero"
                          name={[index, "numero"]}
                          value={nivel.numero}
                          onChange={handleChange}
                          defaultValue={nivel.numero}
                          inputProps={{ min: 1 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ListItem>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button variant="contained" type="button" onClick={() => {
                const items = [...niveles];
                items.push({
                  nombre: '',
                  parentezco: '',
                  celular: '',
                })
                setNiveles(items)
              }}>
                Agregar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Stack>
          </Grid>
        </ListItem>
      </form>
    </>
  );
};

export default ReferidosModal;