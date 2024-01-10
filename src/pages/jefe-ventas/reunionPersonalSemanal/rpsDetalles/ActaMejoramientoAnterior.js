import { Grid, List, ListItem, InputLabel, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';

const ActaMejoramientoAnterior = ({ reunion }) => {
  // console.log('reunion nn', reunion);
  
  // console.log('current user', currentUser);
  

  // const reuniones = useSelector((state) => state.reunion.reunionesRPS);
  // console.log('reuniones', reuniones);

  // const reunionesOfCurrentUser = reuniones.filter((reunion) => {
  //   return reunion.empleados.some((empleado) => empleado.empleadoId === currentUserEmpleadoId);
  // });
  const [antecedentes, setAntecedentes] = useState();
  const [compromiso, setCompromiso] = useState();
  const [meta, setMeta] = useState();
  const [enviado, setEnviado] = useState(true);

  useEffect(() => {
    setAntecedentes(reunion.antecedentes);
    setCompromiso(reunion.compromiso);
    setMeta(reunion.meta);
  }, []);

  // const { updateReunionesRPS } = useReunionPersonalSemanal();


  // async function handleSaveActaMejoramiento() {
  //   console.log("update acta mejoramiento");
  //   await updateReunionesRPS(reunion.idReunion, {
  //     antecedentes,
  //     compromiso,
  //     meta
  //   });
  // }
  // {reunion.idReunion}-{reunion.fechaReunion}

  return (
    <>
      <List sx={{ py: 0 }} dense>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <InputLabel id="antecedentes">Antecedentes</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                multiline
                fullWidth
                placeholder=""
                onChange={(e) => setAntecedentes(e.target.value)}
                value={antecedentes}
                disabled={enviado}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <InputLabel id="compromiso">Compromiso</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                multiline
                fullWidth
                placeholder=""
                onChange={(e) => setCompromiso(e.target.value)}
                value={compromiso}
                disabled={enviado}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <InputLabel id="meta">Meta</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="outlined-multiline-flexible"
                label=""
                multiline
                fullWidth
                placeholder=""
                onChange={(e) => setMeta(e.target.value)}
                value={meta}
                disabled={enviado}
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </>

  );
};

ActaMejoramientoAnterior.propTypes = {};

export default ActaMejoramientoAnterior;
