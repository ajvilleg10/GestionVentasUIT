import { useFormik } from "formik";
import { Accordion, TableBody, AccordionDetails, AccordionSummary, Grid, TextField, Typography, MenuItem, Select, List, ListItem, FormControl, InputLabel, useMediaQuery, Button, TableCell, TableRow, TableHead, Table, Paper, TableContainer } from "@mui/material";
import useUsuarios from "hooks/administrador/useUsuarios";
import { useRef, useState } from "react";
import { useSelector } from "store";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { dispatch } from "store";
import { openSnackbar } from "store/reducers/snackbar";
// import MainCard from "components/MainCard";
// import { useReactToPrint } from "react-to-print";

const Liquidacion = () => {

  const [empleado, setEmpleado] = useState(undefined);
  // const liqRef = useRef();

  useUsuarios({ activos: true });

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const users = useSelector(state => state.users.users);

  useState(() => { }, [users]);

  // const exportToPDF = useReactToPrint({
  //   content: () => liqRef.current,
  // });

  const formik = useFormik({
    initialValues: {
      empleado_id: '',
      fecha_inicio: null,
      fecha_final: null,
      no_liquidacion: 0
    },
    onSubmit: async (values) => {

      console.log('values from submit', values);

      const snackBar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      };

      try {

        if (values.empleado_id === '') throw new Error('El colaborador es requerido');

        const emp = users.filter((em) => em.id === Number(values.empleado_id))[0];
        console.log('emp', emp);

        setEmpleado(emp);

      } catch (err) {

        console.error('Error al buscar informacion', err);
        snackBar.message = err.message ?? 'Error al solicitar la liquidacion del empleado';

      } finally {

        dispatch(openSnackbar(snackBar));

      }

    }
  });

  return (
    <Grid container spacing={3} width={'100%'}>
      <Grid item width={'100%'}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Buscar liquidación por colaborador</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
              <List>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="empleado_select">Colaborador *</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          labelId="empleado_select"
                          id="empleadoSelect"
                          name="empleado_id"
                          value={formik.values.empleado_id}
                          onChange={formik.handleChange}
                        >
                          {users.length === 0 ? (
                            <MenuItem value={''} disabled>
                              No existen colaboradores activos
                            </MenuItem>
                          ) : (
                            users.map((user) => (
                              <MenuItem value={user.id} key={user.id}>
                                {`${user.nombres}  ${user.apellidos}`}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel htmlFor="fechaInicio">Fecha de Inicio</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          id="fechaInicioD"
                          name="fecha_inicio"
                          type="date"
                          value={formik.values.fecha_inicio}
                          onChange={(date) => formik.setFieldValue('fecha_inicio', date)}
                          slotProps={{ textField: { variant: 'outlined' } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel htmlFor="fechaFinal">Fecha Final</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          id="fechaFinalD"
                          name="fecha_final"
                          type="date"
                          value={formik.values.fecha_final}
                          onChange={(date) => formik.setFieldValue('fecha_final', date)}
                          slotProps={{ textField: { variant: 'outlined' } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel htmlFor="no_liquidacion_id">Número de liquidación</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        id="no_liquidacion_id"
                        type="number"
                        name="no_liquidacion"
                        value={formik.values.no_liquidacion}
                        onChange={formik.handleChange}
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Button type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                        Buscar
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        disabled={!empleado}
                        onClick={() => {
                          formik.resetForm();
                          setEmpleado(undefined);
                        }}
                      >
                        Limpiar
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </form>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* <Grid item width={'100%'}> */}
      {/*   {empleado ? ( */}
      {/*     <MainCard */}
      {/*       title={<h2>{`Liquidacion para ${empleado.nombres} ${empleado.apellidos}`}</h2>} */}
      {/*       ref={liqRef} */}
      {/*       secondary={<Button variant="contained" onClick={exportToPDF}>Exportar a PDF</Button>} */}
      {/*     > */}
      {/*       <div> */}
      {/*         <Grid container spacing={3} padding={2}> */}
      {/*           <TableContainer component={Paper}> */}
      {/*             <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table"> */}
      {/*               <TableHead> */}
      {/*                 <TableRow id="reporte-header-contactos"> */}
      {/*                   <TableCell> ALGUN CAMPO</TableCell> */}
      {/*                 </TableRow> */}
      {/*               </TableHead> */}
      {/*               <TableBody> */}
      {/*                 <TableRow id="reporte-header-contactos"> */}
      {/*                   <TableCell> ALGUN CAMPO</TableCell> */}
      {/*                 </TableRow> */}
      {/*               </TableBody> */}
      {/*             </Table> */}
      {/*           </TableContainer> */}
      {/*         </Grid> */}
      {/*       </div> */}
      {/*     </MainCard> */}
      {/*   ) : ( */}
      {/*     <MainCard> */}
      {/*       <h1>Empleado no seleccionado</h1> */}
      {/*     </MainCard> */}
      {/*   )} */}
      {/* </Grid> */}
    </Grid>
  );

};

export default Liquidacion;
