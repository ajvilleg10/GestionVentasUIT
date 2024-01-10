import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  Button,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useTablaComisionesJefe } from 'hooks/administrador/useTablaComisiones';

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  monto_desde: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  monto_hasta: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  bono_comision: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
  {
    id: 'nivel',
    align: 'center',
    disablePadding: true,
    label: 'Nivel'
  },
  {
    id: 'monto_desde',
    align: 'center',
    disablePadding: true,
    label: 'Monto Desde'
  },
  {
    id: 'monto_hasta',
    align: 'center',
    disablePadding: false,
    label: 'Monto hasta'
  },
  {
    id: 'bono_comision',
    align: 'center',
    disablePadding: false,
    label: 'Bonificación por ventas'
  },

];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TablaComisionJefe = () => {

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { tablaComisionesJ, createTablaComisionesJ } = useTablaComisionesJefe();
  const [niveles, setNiveles] = useState([
    {
      no: 1,
      nivel: 1,
      monto_desde: 1,
      monto_hasta: 1,
      bono_comision: 1
    },
  ]);

  useEffect(() => {
    if (tablaComisionesJ != null && tablaComisionesJ.length >= 0) {
      setNiveles([...tablaComisionesJ]);
      setIsUserDataLoaded(true);
    } else if (tablaComisionesJ != null && tablaComisionesJ.length === 0) {
      setIsUserDataLoaded(true);
    }
  }, [tablaComisionesJ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: niveles,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createTablaComisionesJ(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Bonificación agregada con éxito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(niveles);
        //formik.setErrors({});
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
    }
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
        <List sx={{ py: 0 }} dense>
          <Box mt={2}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
              <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                <OrderTableHead />
                <TableBody>
                  {niveles && (niveles.map((nivel, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{nivel.nivel}</TableCell>
                        <TableCell component="th" id={"tabla"} scope="row" align="center">
                          <TextField
                            type="number"
                            fullWidth
                            id="monto_desde"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            name={[index, "monto_desde"]}
                            value={nivel.monto_desde}
                            onChange={handleChange}
                            inputProps={{
                              min: 1, step: "0.01"
                            }}
                            error={formik.touched.monto_desde && Boolean(formik.errors.monto_desde)}
                            helperText={formik.touched.monto_desde && formik.errors.monto_desde}
                          />
                        </TableCell>
                        <TableCell align="center">  <TextField
                          type="number"
                          fullWidth
                          id="monto_hasta"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          name={[index, "monto_hasta"]}
                          value={nivel.monto_hasta}
                          onChange={handleChange}
                          inputProps={{
                            min: 1, step: "0.01"
                          }}
                          defaultValue={nivel.monto_hasta}
                          error={formik.touched.monto_hasta && Boolean(formik.errors.monto_hasta)}
                          helperText={formik.touched.monto_hasta && formik.errors.monto_hasta}
                        /></TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            fullWidth
                            id="bono_comision"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            name={[index, "bono_comision"]}
                            value={nivel.bono_comision}
                            onChange={handleChange}
                            inputProps={{

                              min: 1, step: "0.01"
                            }}
                            defaultValue={nivel.bono_comision}
                            error={formik.touched.bono_comision && Boolean(formik.errors.bono_comision)}
                            helperText={formik.touched.bono_comision && formik.errors.bono_comision}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  }))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <ListItem sx={{ paddingTop: 3 }}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="contained" type="button" onClick={() => {
                  const items = [...niveles];
                  items.push({
                    no: niveles.length + 1,
                    nivel: niveles.length + 1,
                    monto_desde: 1,
                    monto_hasta: 1,
                    bono_comision: 1
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
        </List>
      </form>

    </>
  );
};

export default TablaComisionJefe;
