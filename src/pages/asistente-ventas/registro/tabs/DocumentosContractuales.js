/* eslint-disable no-unused-vars */
import { Grid, List, ListItem, useMediaQuery, InputLabel, IconButton, Tooltip, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { FileUpload, CloudUpload } from '@mui/icons-material';
import FileVisualizer from 'components/FileVisualizer';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import useArchivos from 'hooks/asistente-ventas/useArchivos';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';
import { DOCUMENTOS_CONTRACTUALES } from 'utils/constants';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const initialState = {
  filename: undefined,
  url: '',
  change: false,
  aceptado: false,
  file: undefined
};

const DocumentosContractuales = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = useState(true);
  const { archivos, crearArchivo } = useArchivos();

  const prospecto = useProspectoSeleccionado();

  const [contratoLaboral, setContratoLaboral] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.Contrato
  });
  const [copiaCedula, setCopiaCedula] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.Cedula
  });
  const [hojaDeVida, setHojaVida] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.CV
  });

  useEffect(() => {

    setIsLoading(true);

    setContratoLaboral({
      ...contratoLaboral,
      nombre_contractual: archivos?.contrato_laboral?.nombre_contractual ?? contratoLaboral.nombre_contractual,
      aceptado: archivos?.contrato_laboral?.aceptado ?? false,
      url: archivos?.contrato_laboral?.blob ? URL.createObjectURL(archivos.contrato_laboral.blob) : ''
    });

    setCopiaCedula({
      ...copiaCedula,
      nombre_contractual: archivos?.cedula?.nombre_contractual ?? copiaCedula.nombre_contractual,
      aceptado: archivos?.cedula?.aceptado ?? false,
      url: archivos?.cedula?.blob ? URL.createObjectURL(archivos.cedula.blob) : ''
    });

    setHojaVida({
      ...hojaDeVida,
      nombre_contractual: archivos?.hoja_vida?.nombre_contractual ?? hojaDeVida.nombre_contractual,
      aceptado: archivos?.hoja_vida?.aceptado ?? false,
      url: archivos?.hoja_vida?.blob ? URL.createObjectURL(archivos.hoja_vida.blob) : ''
    });

    setIsLoading(false);

    // if (archivos) {
    //   setContratoLaboral({
    //     filename: archivos.contrato_laboral?.[0].nombre_contractual,
    //     url: archivos.contrato_laboral?.[0].blob ? URL.createObjectURL(archivos.contrato_laboral[0].blob) : '',
    //     change: false,
    //     aceptado: archivos.contrato_laboral?.[0].aceptado ?? false
    //   });
    //   setCopiaCedula({
    //     filename: archivos.cedula?.[0].nombre_contractual,
    //     url: archivos.cedula?.[0].blob ? URL.createObjectURL(archivos.cedula[0].blob) : ''
    //   });
    //   setIsLoading(false);
    // }

  }, [archivos]);

  console.log('Archivos desde asistente', archivos);
  console.log('contrato', contratoLaboral);

  const handleSubmit = async (e, tipo) => {

    e.preventDefault();

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    // let isError = true;

    try {

      if (!contratoLaboral.file && !hojaDeVida.file) throw new Error('Archivo no seleccionado');
      if (!contratoLaboral.change && !hojaDeVida.change) throw new Error('Escoger otro documento para subir');

      const formData = new FormData();

      formData.append('empleado_id', prospecto.empleadoInfo.id);
      formData.append('tipo', tipo);

      // if (tipo === 'cedula') {

      //   formData.append('nombre_contractual', copiaCedula.filename);
      //   formData.append('archivo', copiaCedula.file);
      //   formData.append('nombre_archivo', copiaCedula.file.name);
      // } else 

      if (tipo === 'hoja_vida') {

        formData.append('nombre_contractual', hojaDeVida.filename);
        formData.append('archivo', hojaDeVida.file);
        formData.append('nombre_archivo', hojaDeVida.file.name);

      } else {

        formData.append('nombre_contractual', contratoLaboral.filename);
        formData.append('archivo', contratoLaboral.file);
        formData.append('nombre_archivo', contratoLaboral.file.name);

      }

      const rs = await crearArchivo(formData);

      snackbar.message = rs.message ?? 'Contrato laboral subido con éxito';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('Error al el archivo desde asistente a prospecto', error);

      snackbar.message = error.message ?? 'Error al subir el documento';
      snackbar.alert.color = 'error';

    } finally {

      if (tipo === 'hoja_vida') setHojaVida({ ...hojaDeVida, change: false });
      else setContratoLaboral({ ...contratoLaboral, change: false });

      // if (tipo === 'cedula') setCopiaCedula({ ...copiaCedula, change: false });
      // else if (tipo === 'hoja_vida') setHojaVida({ ...hojaDeVida, change: false });
      // else setContratoLaboral({ ...contratoLaboral, change: false });

      dispatch(openSnackbar(snackbar));

    }

  };

  const handleChangeFile = (e) => {

    if (e.target.files.length === 0) return;
    const filename = e.target.files[0].name;
    const ext = filename.split('.').slice(-1)[0];

    if (ext === 'pdf') {

      if (e.target.files[0].size > 2e6) {

        dispatch(openSnackbar({
          open: true,
          variant: 'alert',
          alert: { color: 'error' },
          message: 'El tamaño del archivo no debe ser mayor a 2MB',
          close: false
        }));

        return;

      }

      const data = {
        change: true,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      };

      console.log('hey');

      if (e.target.name === 'contrato_laboral') {

        setContratoLaboral({
          ...contratoLaboral,
          ...data
        });

      } if (e.target.name === 'hoja_vida') {

        setHojaVida({
          ...hojaDeVida,
          ...data
        });

      }
      // else {
      //   setCopiaCedula({
      //     ...copiaCedula,
      //     ...data
      //   });
      // }

    } else {

      dispatch(openSnackbar({
        open: true,
        variant: 'alert',
        alert: { color: 'error' },
        message: 'Error de formato, seleccione un archivo pdf',
        close: false
      }));

    }
  };

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item xs={12}>
          <h1>Cargando archivos</h1>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <MainCard title="Documentos contractuales">
              <List sx={{ py: 0 }}>
                <form onSubmit={(e) => handleSubmit(e, 'contrato_laboral')}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3} paddingY={2}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="contrato_laboral">Contrato Laboral</InputLabel>
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" alignItems="center">
                        <Button component="label" variant="contained" startIcon={<CloudUpload />} disabled={contratoLaboral.aceptado}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="contrato_laboral" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={contratoLaboral}
                          alt={DOCUMENTOS_CONTRACTUALES.Contrato}
                          accept={false}
                        />
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" justifyContent="end">
                        <Tooltip title="Enviar documento">
                          <div>
                            <IconButton variant="contained" color="primary" type="submit" disabled={contratoLaboral.aceptado}>
                              <FileUpload />
                            </IconButton>
                          </div>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </ListItem>
                </form>
                <form onSubmit={(e) => handleSubmit(e, 'hoja_vida')}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3} paddingY={2}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="hoja_vida">Hoja de vida</InputLabel>
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" alignItems="center">
                        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="hoja_vida" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={hojaDeVida}
                          alt={hojaDeVida.nombre_contractual}
                          accept={false}
                        />
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" justifyContent="end">
                        <Tooltip title="Enviar documento">
                          <div>
                            <IconButton variant="contained" color="primary" type="submit">
                              <FileUpload />
                            </IconButton>
                          </div>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </ListItem>
                </form>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Documentos del prospecto">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="copiaCedula">Copia de Cédula</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FileVisualizer
                        data={copiaCedula}
                        accept={false}
                        alt={DOCUMENTOS_CONTRACTUALES.Cedula}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {/* <ListItem divider={!matchDownMD}> */}
                {/*   <Grid container spacing={3}> */}
                {/*     <Grid item xs={12} md={3} display="flex" alignItems="center"> */}
                {/*       <InputLabel id="hojaVida">Hoja de vida</InputLabel> */}
                {/*     </Grid> */}
                {/*     <Grid item xs={12} md={3}> */}
                {/*       <FileVisualizer */}
                {/*         data={hojaDeVida} */}
                {/*         accept={false} */}
                {/*         alt={DOCUMENTOS_CONTRACTUALES.CV} */}
                {/*       /> */}
                {/*     </Grid> */}
                {/*   </Grid> */}
                {/* </ListItem> */}
              </List>
            </MainCard>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DocumentosContractuales;
