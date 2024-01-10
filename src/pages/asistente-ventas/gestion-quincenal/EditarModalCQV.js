/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import * as yup from 'yup';
import { useFormik } from 'formik';

import ComiteSemanalFormulario from '../comite-semanal-gerencial/ComiteSemanalFormulario';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { REUNION } from 'utils/constants';
import { updateReunion } from 'store/reducers/reunionGeneral';

dayjs.extend(duration);

const EditarModalCQV = ({ handleEditarCapacitacion, capacitacion }) => {

  const [open, setOpen] = useState(false);
  const [updating, setIsUpdating] = useState(false);

  const formik = useFormik({
    initialValues: {
      hora_inicio: dayjs(capacitacion.fecha_inicio, 'YYYY-MM-DD HH:mm'),
      hora_final: dayjs(capacitacion.fecha_final, 'YYYY-MM-DD HH:mm'),
      duracion: capacitacion.duracion,
      fecha_reunion: dayjs(capacitacion.fecha_reunion),
      comentario: capacitacion.comentario ?? '',
      updated_date: {
        time: false,
        date: false,
        current: capacitacion.updated_date
      }
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      comentario: yup.string().required('El comentario es requerido')
    }),
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

        const rs = await handleEditarCapacitacion(capacitacion.id, updateObj);
        dispatch(updateReunion({ tipo_reunion: REUNION.Quincenal, data: updateObj, reunion_id: capacitacion.id }));

        snackbar.message = rs.message ?? 'Capacitación quincenal actualizada con éxito';
        snackbar.alert.color = 'success';

      } catch (error) {

        console.error('Error al editar la capacitacion quincenal', error);

        snackbar.message = error.message ?? 'Error al editar la capacitacion quincenal';
        snackbar.alert.color = 'error';

        formik.resetForm();

      } finally {

        setOpen(false);
        setIsUpdating(false);

        dispatch(openSnackbar(snackbar));

      }

    }
  })

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

          <DialogTitle id="alert-dialog-title-cqv">
            Editar capacitación quincenal de ventas
          </DialogTitle>

          <DialogContent>
            <ComiteSemanalFormulario formik={formik} data={capacitacion} />
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

export default EditarModalCQV;
