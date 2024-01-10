import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Grid, InputLabel, List, ListItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import ActaMejoramiento from './ActaMejoramiento'
import { useSelector } from 'store'
import MainCard from 'components/MainCard'
import ActasAnteriores from './ActasAnteriores'
import { dayMonthYearFormat, reunionesSorted, timeShortFormat } from 'utils/reunionFormat';
import dayjs from 'dayjs'

const RpsDetalles = () => {
  const { idReunion } = useParams()
  const currentUser = useSelector((state) => state.user);
  const currentUserEmpleadoId = currentUser.id;

  const navigate = useNavigate();
  const reuniones = useSelector((state) => state.reunion.reunionesRPS);

  const reunion = reuniones.find((reunion) => {
    const t = reunion.idReunion == idReunion
    // console.log('the bool', t, reunion.idReunion, idReunion, typeof(idReunion), typeof(reunion.idReunion));
    return t
  });
  const reunionesOfCurrentUser = reuniones.filter((reunion) => {
    return reunion.empleados.some((empleado) => empleado.empleadoId === currentUserEmpleadoId);
  });


  const vendedor = reunion.empleados.find((empleado) => empleado.nombreTipoCuenta === "Vendedor");
  const jefeDeVentas = reunion.empleados.find((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas");
  console.log('jefeDeVentas', jefeDeVentas);

  const empleadoIdVendedor = vendedor.empleadoId;
  const reunionesWithCurrentVendedor = reunionesOfCurrentUser.filter((reunion) => {
    return reunion.empleados.some((empleado) => empleado.empleadoId == empleadoIdVendedor);
  });

  const reunionesWithCurrentVendedorSorted = reunionesSorted(reunionesWithCurrentVendedor);
  


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Volver</Button>

        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MainCard border={false} boxShadow >
            <List>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Reunion ID</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel >{idReunion}</InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <TextField 
                      value={idReunion}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Jefe de Venta</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel >{jefeDeVentas.empleadoNombres + ' ' + jefeDeVentas.empleadoApellidos}</InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <TextField 
                      value={jefeDeVentas.empleadoNombres + ' ' + jefeDeVentas.empleadoApellidos}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel >{vendedor.empleadoNombres + ' ' + vendedor.empleadoApellidos}</InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <TextField 
                      value={vendedor.empleadoNombres + ' ' + vendedor.empleadoApellidos}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Fecha</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel >{dayjs(reunion.fechaReunion).format('DD/MM/YYYY')}</InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <TextField 
                      value={dayjs(reunion.fechaReunion).format('DD/MM/YYYY')}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Duración</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel >{dayjs(reunion.duracion).format('HH:mm')}</InputLabel>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <TextField 
                      value={dayjs(reunion.duracion).format('HH:mm')}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </ListItem>
              
            </List>
            <ActaMejoramiento reunion={reunion} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ActasAnteriores idReunionHoy={idReunion} reuniones={reunionesWithCurrentVendedorSorted}/>
        </Grid>
      </Grid>


    </>
  )
}

export default RpsDetalles
