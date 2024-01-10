import { useState } from 'react'
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import ComiteSemanalFormulario from './ComiteSemanalFormulario';
import { updateReunion } from 'store/reducers/reunionGeneral';
import { REUNION } from 'utils/constants';

dayjs.extend(duration);

const validationSchema = yup.object({
  comentario: yup.string().required('El comentario es requerido')
})

const EditarModalCMV = ({ handleEditarReunion, reunion }) => {

  const [open, setOpen] = useState(false);
  const [updating, setIsUpdating] = useState(false);

  const formik = useFormik({
    initialValues: {
      hora_inicio: dayjs(reunion.fecha_inicio, 'YYYY-MM-DD HH:mm'),
      hora_final: dayjs(reunion.fecha_final, 'YYYY-MM-DD HH:mm'),
      duracion: reunion.duracion,
      fecha_reunion: dayjs(reunion.fecha_reunion),
      comentario: reunion.comentario,
      updated_date: {
        time: false,
        date: false,
        current: reunion.updated_date
      }
    },
    enableReinitialize: true,
    validationSchema,
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

        const fecha_inicio = values.fecha_reunion.hour(values.hora_inicio.hour()).minute(values.hora_inicio.minute()).format('YYYY-MM-DD HH:mm');
        const fecha_final = values.fecha_reunion.hour(values.hora_final.hour()).minute(values.hora_final.minute()).format('YYYY-MM-DD HH:mm');

        const updateObj = {
          fecha_inicio,
          fecha_final,
          fecha_reunion: values.fecha_reunion.format('YYYY-MM-DD'),
          duracion: values.duracion,
          comentario: values.comentario,
          updated_date: values.updated_date.time || values.updated_date.date
        };

        const rs = await handleEditarReunion(reunion.id, updateObj);
        dispatch(updateReunion({ tipo_reunion: REUNION.Semanal, data: updateObj, reunion_id: reunion.id }));

        snackbar.message = rs.message ?? 'Comité semanal actualizado con éxito';
        snackbar.alert.color = 'success';

      } catch (error) {

        console.error('Error al editar el comite semanal', error);
        snackbar.message = error.message ?? 'Error al editar el comité semanal';
        snackbar.alert.color = 'error';

        formik.resetForm();

      } finally {

        setOpen(false);
        setIsUpdating(false);

        dispatch(openSnackbar(snackbar));

      }

    }
  });

  return (
    <>
      <Tooltip title="Editar reunión">
        <IconButton color='primary' variant='outlined' onClick={() => setOpen(true)}>
          <ModeEditIcon fontSize='large' />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>

          <DialogTitle id="alert-dialog-title">
            Editar comité semanal gerencial
          </DialogTitle>

          <DialogContent>
            <ComiteSemanalFormulario formik={formik} data={reunion} />
          </DialogContent>

          <DialogActions>

            <Button
              autoFocus
              variant='contained'
              color='error'
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
            >
              Cancelar
            </Button>

            <Button
              color='primary'
              variant='contained'
              type='submit'
              disabled={updating}
            >
              Guardar
            </Button>

          </DialogActions>

        </form>
      </Dialog>
    </>
  );
}

export default EditarModalCMV;

      // return;

      // try {

      //   if (values.duracion < 120) throw new Error('La duración debe ser 2 horas mínimo');
      //   if (values.fecha_reunion.day() == 6 || values.fecha_reunion.day() == 0) throw new Error('La reunión debe ser en dia laboral');

      //   const f1 = values.fecha_reunion.set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
      //   const f2 = values.fecha_reunion.set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

      //   const updateCMV = {
      //     fecha_inicio: f1.format('YYYY-MM-DD HH:mm'),
      //     fecha_final: f2.format('YYYY-MM-DD HH:mm'),
      //     duracion: values.duracion,
      //     comentario: values.comentario
      //   };

      //   await handleEditarReunion(reunion.id, updateCMV);

      //   snackbar.message = 'Reunión actualizada con éxito';
      //   snackbar.alert.color = 'success';

      // } catch (error) {

      //   snackbar.message = error.message;
      //   snackbar.alert.color = 'error';

      // } finally {

      //   setOpen(false);
      //   setIsUpdating(false);
      //   formik.resetForm();

      // }
