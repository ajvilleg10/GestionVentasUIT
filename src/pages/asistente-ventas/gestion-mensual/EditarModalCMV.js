import { useState } from 'react'
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import ComiteMensualFormulario from './ComiteMensualForm';

dayjs.extend(duration);

const EditarModalCMV = ({ handleEditarReunion, reunion }) => {

  const [open, setOpen] = useState(false);
  const [updating, setIsUpdating] = useState(false);

  const formik = useFormik({
    initialValues: {
      hora_inicio: dayjs(reunion.fecha_inicio, 'YYYY-MM-DD HH:mm'),
      hora_final: dayjs(reunion.fecha_final, 'YYYY-MM-DD HH:mm'),
      duracion: reunion.duracion,
      fecha_reunion: dayjs(reunion.fecha_reunion)
    },
    onSubmit: async (values) => {

      setIsUpdating(true);

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      };

      try {

        if (values.duracion < 120) throw new Error('La duración debe ser 2 horas mínimo');
        if (values.fecha_reunion.day() == 6 || values.fecha_reunion.day() == 0) throw new Error('La reunión debe ser en dia laboral');

        const f1 = values.fecha_reunion.set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
        const f2 = values.fecha_reunion.set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

        const updateCMV = {
          fecha_inicio: f1.format('YYYY-MM-DD HH:mm'),
          fecha_final: f2.format('YYYY-MM-DD HH:mm'),
          duracion: values.duracion
        };

        await handleEditarReunion(reunion.id, updateCMV);

        snackbar.message = 'Reunión actualizada con éxito';
        snackbar.alert.color = 'success';

      } catch (error) {

        snackbar.message = error.message;
        snackbar.alert.color = 'error';

      } finally {

        setOpen(false);
        formik.resetForm();
        setIsUpdating(false);

      }

      dispatch(openSnackbar(snackbar));

    }
  });

  return (
    <>
      <Button variant="outlined" startIcon={<ModeEditIcon />} onClick={() => setOpen(true)}>
        Editar
      </Button>

      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>

          <DialogTitle id="alert-dialog-title">
            Editar comité mensual
          </DialogTitle>

          <DialogContent>
            <ComiteMensualFormulario formik={formik} data={reunion}/>
          </DialogContent>

          <DialogActions>
            <Button autoFocus variant="contained" color="primary" onClick={() => { setOpen(false); formik.resetForm(); }}> 
              Cancelar 
            </Button>
            <Button color='error' variant='contained' type="submit" disabled={updating}>
              Guardar
            </Button>
          </DialogActions>

        </form>
      </Dialog>
    </>
  );
}

export default EditarModalCMV;
