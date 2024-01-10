import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  InputLabel,
  Button,
  Stack,
  InputAdornment
} from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useConfBonificacionGestionAsistenteVentas } from 'hooks/administrador/useConfBonificacionGestion';

const validationSchema = yup.object({
  numero_contactos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  bono_semanal_cumplimiento: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  llamadas_no_verificadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  llamadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  emails: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  whatsapp: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
});

// TODO: Cambiar los campos de llamadas y mensajes por whatsapp
const ConfBonificacionAsistenteVentas = () => {

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { bonAV, createBonAV } = useConfBonificacionGestionAsistenteVentas();
  const [bonificacionAV, setBonificacionAV] = useState({
    bono_semanal_cumplimiento: 1,
    llamadas_no_verificadas: 1,
    llamadas: 1,
    emails: 1,
    whatsapp: 1,
    whatsapp_llamada: 1
  });

  useEffect(() => {
    if (bonAV != null) {
      setBonificacionAV({ ...bonAV });
      setIsUserDataLoaded(true);
    }

  }, [bonAV]);

  useEffect(() => {
    if (bonAV == null) {
      setBonificacionAV({
        bono_semanal_cumplimiento: 1,
        llamadas_no_verificadas: 1,
        llamadas: 1,
        emails: 1,
        whatsapp: 1,
        whatsapp_llamada: 1
      });
    }

  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: bonificacionAV,
    isInitialValid: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createBonAV(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Bonificación agregada con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(bonificacionAV);
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
    }
  });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <List sx={{ py: 0 }} dense>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="bono_semanal_cumplimiento">Bono por cumplimiento semanal</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="bono_semanal_cumplimiento"
                      name="bono_semanal_cumplimiento"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      value={formik.values.bono_semanal_cumplimiento}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        step: "0.01"
                      }}
                      error={formik.touched.bono_semanal_cumplimiento && Boolean(formik.errors.bono_semanal_cumplimiento)}
                      helperText={formik.touched.bono_semanal_cumplimiento && formik.errors.bono_semanal_cumplimiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="llamadas_no_verificadas">Porcentaje de llamadas no verificadas</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="llamadas_no_verificadas"
                      name="llamadas_no_verificadas"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      value={formik.values.llamadas_no_verificadas}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.llamadas_no_verificadas && Boolean(formik.errors.llamadas_no_verificadas)}
                      helperText={formik.touched.llamadas_no_verificadas && formik.errors.llamadas_no_verificadas}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="llamadas">Llamadas</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="llamadas"
                      name="llamadas"
                      value={formik.values.llamadas}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.llamadas && Boolean(formik.errors.llamadas)}
                      helperText={formik.touched.llamadas && formik.errors.llamadas}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="emails">Emails</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="emails"
                      name="emails"
                      value={formik.values.emails}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.emails && Boolean(formik.errors.emails)}
                      helperText={formik.touched.emails && formik.errors.emails}
                    />
                  </Grid>

                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="whatsapp">Mensajes por Whatsapp</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="whatsapp"
                      name="whatsapp"
                      value={formik.values.whatsapp}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.whatsapp && Boolean(formik.errors.whatsapp)}
                      helperText={formik.touched.whatsapp && formik.errors.whatsapp}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
                    <InputLabel htmlFor="whatsapp_llamada">Llamadas por Whatsapp</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      type="number"
                      fullWidth
                      id="whatsapp_llamada"
                      name="whatsapp_llamada"
                      value={formik.values.whatsapp_llamada}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.whatsapp && Boolean(formik.errors.whatsapp)}
                      helperText={formik.touched.whatsapp && formik.errors.whatsapp}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
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
        </Grid>
      </Grid>
    </>
  );
};

export default ConfBonificacionAsistenteVentas
