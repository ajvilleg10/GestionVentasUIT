import { useState } from 'react'
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { updateReunion } from 'store/reducers/reunionGeneral';
import { REUNION } from 'utils/constants';
import ComiteSemanalFormulario from '../comite-semanal-gerencial/ComiteSemanalFormulario';

dayjs.extend(duration);

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
        dispatch(updateReunion({ tipo_reunion: REUNION.Mensual, data: updateObj, reunion_id: reunion.id }));

        snackbar.message = rs.message ?? 'Comité mensual actualizado con éxito';
        snackbar.alert.color = 'success';

      } catch (error) {

        console.error('Error al editar el comite mensual', error);
        snackbar.message = error.message ?? 'Error al editar el comité mensual';
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
            Editar comité mensual de ventas
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
