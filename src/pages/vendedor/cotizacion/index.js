/// NOTE: Esta pantalla no se esta utilizando
import {
  Grid,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box
} from '@mui/material';

import { useEffect, useMemo, useState } from 'react';

import MainCard from 'components/MainCard';
import ContactoFormulario from './contactoForm';
import PlanesFormulario from './planForm';
import ResumenCotizacion from './resumen';
import * as yup from 'yup';

import { useFormik } from 'formik';
import useContactosCotizacion from "hooks/vendedor/useContactosCotizacion";

const Cotizacion = () => {

  const contactos = useContactosCotizacion();
  const [contactoS, setContactoS] = useState('new');
  const [activeStep, setActiveStep] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [finish, setFinish] = useState(false);

  const newFormValues = {
    numero_cedula: '',
    numero_celular: '',
    telefono: '',
    email: '',
    fecha_nacimiento: '',
    direccion: '',
    nombres: '',
    apellidos: '',
    plan: '',
    anexos: []
  };

  const steps = useMemo(() => [
    "Información de contacto",
    "Selección de plan"
  ], []);

  useEffect(() => {

    if (contactoS !== 'new') {

      const contacto = contactos.find((c) => c.id === Number(contactoS));

      setInitialValues({
        nombres: contacto.nombres,
        apellidos: contacto.apellidos,
        numero_cedula: contacto.numero_cedula ?? '',
        numero_celular: contacto.numero_celular,
        telefono: contacto.telefono ?? '',
        email: contacto.email ?? '',
        fecha_nacimiento: contacto.fecha_nacimiento ?? '',
        direccion: contacto.direccion ?? '',
        plan: '',
        anexos: []
      });

    } else {
      setInitialValues(newFormValues);
    }

  }, [contactoS]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    // validationSchema: yup.object({
    //   email: yup.string().required("Campo requerido")
    // }),
    onSubmit: (values) => {

      console.log('-------------- Values ----------------', values);

      if (contactoS === 'new') {
        alert('Nuevo contacto');
        console.log('Esto es un nuevo contacto');
      } else {
        console.log('No es nuevo contacto');
        alert('No es nuevo contacto');
      }

    }
  });

  const handleNext = () => {
    if (activeStep <= steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === steps.length) {
      setFinish(true);
    } else {
      console.log('Ya no se puede avanzar mas');
    }
  };

  console.log('Renders');

  return (
    <>
      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <List sx={{ py: 0 }}>
              <ListItem divider>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel>Contacto</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <Select
                        id="contactoSelect"
                        name="contacto"
                        value={contactoS}
                        onChange={(e) => setContactoS(e.target.value)}
                        disabled={activeStep !== 0}
                      >
                        <MenuItem value={'new'}>
                          Nuevo contacto
                        </MenuItem>
                        {contactos?.map((contacto) => (
                          <MenuItem value={contacto.id} key={contacto.id}>
                            {`${contacto.nombres} ${contacto.apellidos}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((st, index) => (
                  <Step key={index}>
                    <StepLabel>{st}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} sx={{ paddingTop: 3 }}>
                  <Grid item xs={12}>
                    {activeStep === 0 && (<ContactoFormulario formik={formik} />)}
                    {activeStep === 1 && (<PlanesFormulario formik={formik} />)}
                    {activeStep === 2 && (<ResumenCotizacion formik={formik} />)}
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => {
                          if (activeStep === steps.length) {
                            setFinish(false);
                          }
                          setActiveStep((prev) => prev - 1);
                        }}
                        variant="contained"
                        sx={{ mr: 1 }}
                      >
                        Volver
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleNext} variant="contained" type={activeStep === steps.length && finish ? 'submit' : 'button'}>
                        {activeStep === steps.length - 1 ? 'Confirmar' : activeStep === steps.length ? 'Completar' : 'Siguiente'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </>

  );

};

export default Cotizacion;
