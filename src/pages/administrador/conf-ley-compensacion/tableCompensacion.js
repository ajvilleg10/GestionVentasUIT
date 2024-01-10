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

import { useFormik } from 'formik';
import * as yup from 'yup';

// import dayjs from 'dayjs';
// import { useTablaComisionesJefe } from 'hooks/administrador/useTablaComisiones';
import useLeyCompensacion from 'hooks/administrador/useLeyCompensacion';

const validationSchema = yup.object({
  vendedores_activos: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  produccion_nueva: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
  {
    id: 'mes',
    align: 'center',
    disablePadding: true,
    label: 'Mes'
  },
  {
    id: 'vendedores_activos',
    align: 'center',
    disablePadding: true,
    label: 'Vendedores Activos'
  },
  {
    id: 'produccion_nueva',
    align: 'center',
    disablePadding: false,
    label: 'Produccion Nueva'
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

const TableCompensacion = ({ anio }) => {

  var { leyCompensacionBack, createCompensacion } = useLeyCompensacion(anio);
  const [meses, setNiveles] = useState([
    { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
    { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
    { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
    { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
  ]);

  useEffect(() => {
    if (leyCompensacionBack != null && leyCompensacionBack.length === 12) {
      setNiveles([...leyCompensacionBack]);
    } else {
      meses.map((row, index) => { row['anio'] = anio; });
    }
  }, [leyCompensacionBack]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: meses,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createCompensacion(meses);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Comision agregada con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(meses);
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
    meses[index][key] = value;
    setNiveles([...meses]);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <List sx={{ py: 0 }} dense>
          <Box mt={2}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
              <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                <OrderTableHead />
                <TableBody>
                  {meses && (meses.map((nivel, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell component="th" id={"tabla"} scope="row" align="center">
                          <TextField
                            type="number"
                            fullWidth
                            id="vendedores_activos"
                            name={[index, "vendedores_activos"]}
                            value={nivel.vendedores_activos}
                            onChange={handleChange}
                            inputProps={{
                              min: 1,
                            }}
                            error={formik.touched.vendedores_activos && Boolean(formik.errors.vendedores_activos)}
                            helperText={formik.touched.vendedores_activos && formik.errors.vendedores_activos}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            fullWidth
                            id="produccion_nueva"
                            name={[index, "produccion_nueva"]}
                            value={nivel.produccion_nueva}
                            onChange={handleChange}
                            inputProps={{
                              min: 1, step: "0.01"
                            }}
                            defaultValue={nivel.produccion_nueva}
                            error={formik.touched.produccion_nueva && Boolean(formik.errors.produccion_nueva)}
                            helperText={formik.touched.produccion_nueva && formik.errors.produccion_nueva}
                          /></TableCell>
                      </TableRow>
                    );
                  }))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <ListItem sx={{ paddingTop: 3 }}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
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

export default TableCompensacion;
