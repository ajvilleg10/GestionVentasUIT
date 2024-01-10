import { Avatar, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, InputLabel, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'store';
import useCurrentUser from 'hooks/useCurrentUser';
import MainCard from 'components/MainCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useContacto from 'hooks/contacto/useContacto';
import { get } from 'lodash';
import TransferenciaContactosReactTable from './TransferenciaContactosReactTable';


const TransferenciaContactosJefeVentas = () => {
  const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  // console.log('current user', empleadoInfo, tipoCuentaInfo, cuentaInfo);
  // const { getContactos } = useContacto();

  // const { contactos } = useContacto();
  
  // useEffect(() => {
  //   console.log('contactosss', contactos);
  //   // const [contactos, setContactos] = useState([]);
    

  // }, [contactos])

  // const contactosRows = contactos?.map((contacto) => {
  //   return (
  //     <TableRow key={contacto.id}>
  //       <TableCell>{`${contacto.nombres} ${contacto.apellidos}`}</TableCell>
  //       <TableCell>{contacto.numero_celular}</TableCell>
  //       <TableCell>{contacto.origen_contacto}</TableCell>
  //       <TableCell>{contacto.EstadoContacto.estado_contacto}</TableCell>
  //       <TableCell>{`${contacto.Empleado.nombres} ${contacto.Empleado.apellidos}`}</TableCell>
  //     </TableRow>
  //   )
  
  // })

  return (
    <>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <MainCard title='Cuenta'>
            <List sx={{ py: 0 }} dense>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Nombre:</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={empleadoInfo?.nombres + ' ' + empleadoInfo?.apellidos}
                      disabled
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Empleado ID:</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={cuentaInfo?.empleado_id}
                      disabled
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Tipo de Cuenta:</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={tipoCuentaInfo?.nombre_tipo}
                      disabled
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel >Email:</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      value={cuentaInfo?.email}
                      disabled
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid> */}

        
        <Grid item xs={12}>
          <TransferenciaContactosReactTable />
        </Grid>
      </Grid>
    </>
  )
}

export default TransferenciaContactosJefeVentas