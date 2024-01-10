import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const EnviarModal = ({ isDisabled, formik, isSent }) => {

  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const onClick = async () => {

    const errors = await formik.validateForm();
    formik.setTouched(errors);

    let valid = Object.keys(errors).length === 0;
    setOpen(valid);

  }

  useEffect(() => { setOpen(sent && !isSent) }, [isSent]);

  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={isDisabled}
      >
        Enviar información
      </Button>

      <Dialog
        maxWidth={'110px'}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title-prospecto-envio-formulario">
          Formulario de registro
        </DialogTitle>

        <DialogContent>
          ¿Estás seguro de que deseas enviar el formulario de registro?
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            variant='contained'
            color='error'
            sx={{ width: '100px' }}
            disabled={formik.isSubmitting}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            color='primary'
            variant='contained'
            sx={{ width: '100px' }}
            disabled={formik.isSubmitting}
            onClick={() => { formik.handleSubmit(); setSent(true); }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EnviarModal;
