import { Grid, List, ListItem, InputLabel, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';

const ActaMejoramiento = ({ reunion }) => {

  const [antecedentes, setAntecedentes] = useState();
  const [compromiso, setCompromiso] = useState();
  const [meta, setMeta] = useState();
  const [enviado, setEnviado] = useState(reunion.enviado);

  const dispatch = useDispatch();

  useEffect(() => {
    setAntecedentes(reunion.antecedentes);
    setCompromiso(reunion.compromiso);
    setMeta(reunion.meta);
  }, []);

  const { updateReunionesRPS } = useReunionPersonalSemanal();


  async function handleSaveActaMejoramiento() {
    console.log("update acta mejoramiento");
    await updateReunionesRPS(reunion.idReunion, {
      antecedentes,
      compromiso,
      meta
    });

    dispatch(
      openSnackbar({
        open: true,
        message: 'Acta de Mejoramiento guardada con exito',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  }

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
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9} display="flex" alignItems="center">

            </Grid>
            <Grid item xs={12} md={3}>
              <Button disabled={enviado} sx={{ mt: 2 }} onClick={handleSaveActaMejoramiento} variant="contained" fullWidth>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </>

  );
};

ActaMejoramiento.propTypes = {};

export default ActaMejoramiento;
