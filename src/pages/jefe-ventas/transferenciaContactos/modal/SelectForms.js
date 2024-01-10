import { useDispatch } from 'store';

// material-ui
import { Button, FormControl, FormHelperText, Grid, InputLabel, Select, Stack, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import useVendedoresByJefeVentaEmpeladoId from 'hooks/jefeVenta/useVendedoresByJefeVentaEmpeladoId';
import { update } from 'lodash';
import useContacto from 'hooks/contacto/useContacto';
import { updateContactos } from 'store/reducers/transferenciaContactosSlice';

/**
 * 'Enter your age'
 * yup.number Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  vendedor: yup.string().required('Vendedor es requerido')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const SelectForms = ({ contactos, handleClose }) => {
  const dispatch = useDispatch();
  const vendedores = useVendedoresByJefeVentaEmpeladoId();
  const { updateTransferirContactos } = useContacto();

  const formik = useFormik({
    initialValues: {
      vendedor: ''
    },
    validationSchema,
    onSubmit: (values) => {

      console.log('select form submit - ', values);
      try {
        console.log('contactos', contactos);

        const jefeVentaEmpleado = notInVendedoresContactos.find((vendedor) => vendedor.empleadoId === values.vendedor).Empleado;

        const formData = {
          id: contactos.map((contacto) => contacto.contactoId),
          empleado_id: values.vendedor,
          Empleado: jefeVentaEmpleado
        }
        console.log('formData', formData);
        updateTransferirContactos(formData);
        dispatch(updateContactos(formData));

        handleClose();

        dispatch(
          openSnackbar({
            open: true,
            message: 'Select - Submit Success',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );

        // formik.setValues(initialFormValues);
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


  const vendedoress = vendedores.map((vendedor) => {
    const nombre = vendedor.Empleado.nombres + ' ' + vendedor.Empleado.apellidos;
    const vendedorId = vendedor.id;
    const empleadoId = vendedor.empleado_id;

    return {
      nombre,
      vendedorId,
      empleadoId,
      Empleado: vendedor.Empleado
    }
  })

  console.log('vendedoress', vendedoress);
  console.log('contactos', contactos);

  // const vendedoresContactos = contactos.map((contacto) => {
  //   const vendedor = vendedoress.find((vendedor) => vendedor.empleadoId === contacto.vendedorEmpleadoId);
  //   console.log('vendedorrr', vendedor);
  //   const nombre = vendedor.Empleado.nombres + ' ' + vendedor.Empleado.apellidos;
  //   const vendedorId = vendedor.id;
  //   const empleadoId = vendedor.empleado_id;

  //   return {
  //     nombre,
  //     vendedorId,
  //     empleadoId
  //   }

  // });



  const notInVendedoresContactos = vendedoress.filter((vendedor) => {
    return !contactos.some((contacto) => contacto.vendedorEmpleadoId === vendedor.empleadoId);
  });

  console.log('not in', notInVendedoresContactos);

  const message = notInVendedoresContactos.length === 0 ?
    (
      <Typography variant="subtitle1" >
        No existe vendedores libres para transferir
      </Typography>
    )
    :
    (
      <Typography variant="subtitle1" >
        {`Existe ${notInVendedoresContactos.length} vendedores libre(s) para transferir`}
      </Typography>
    )





  return (
    <MainCard title="Seleccione el Vendedor" >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              {message}
              <InputLabel htmlFor="age">Vendedor</InputLabel>
              <FormControl sx={{ m: 1, minWidth: 220 }}>
                <Select id="vendedor" name="vendedor" value={formik.values.vendedor} onChange={formik.handleChange}>
                  <MenuItem value="">
                    <em>Seleccione el Vendedor</em>
                  </MenuItem>
                  {notInVendedoresContactos.map((vendedor) => (
                    <MenuItem value={vendedor.empleadoId}>{vendedor.nombre}</MenuItem>

                  ))}
                  {/* <MenuItem value={20}>Twenty</MenuItem> */}
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              {formik.errors.vendedor && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.vendedor}{' '}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Transferir
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default SelectForms;

