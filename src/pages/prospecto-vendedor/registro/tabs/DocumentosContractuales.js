import { Grid, List, ListItem, useMediaQuery, Button, Tooltip, InputLabel, IconButton } from '@mui/material';
import MainCard from 'components/MainCard';
import FileVisualizer from 'components/FileVisualizer';

import { FileUpload, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { DOCUMENTOS_CONTRACTUALES } from 'utils/constants';

import useArchivos from 'hooks/vendedor/useArchivos';

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
  const [acceptance, setAcceptance] = useState({});

  const [cedula, setCedula] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.Cedula
  });
  const [hojaDeVida, setHojaVida] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.CV
  });

  const currentUser = useSelector(state => state.user);
  const { archivos, crearArchivo, updateArchivo } = useArchivos(currentUser.id);

  useEffect(() => {

    if (archivos) {

      setAcceptance({
        acuerdo: archivos.acuerdo[0].aceptado,
        tabla_bonificacion: archivos.tabla_bonificacion[0].aceptado,
        contrato_laboral: archivos?.contrato_laboral?.[0].aceptado ?? false,
      });

      setCedula({
        ...cedula,
        filename: archivos.cedula?.[0].nombre_contractual ?? DOCUMENTOS_CONTRACTUALES.Cedula,
        url: archivos?.cedula?.[0].blob ? URL.createObjectURL(archivos?.cedula?.[0].blob) : '',
        uploaded: archivos?.cedula?.[0].aceptado ?? false
      });

      setHojaVida({
        ...hojaDeVida,
        filename: archivos.hoja_vida?.[0].nombre_contractual ?? DOCUMENTOS_CONTRACTUALES.CV,
        url: archivos?.hoja_vida?.[0].blob ? URL.createObjectURL(archivos?.hoja_vida?.[0].blob) : '',
        uploaded: archivos?.hoja_vida?.[0].aceptado ?? false
      });

      setIsLoading(false);

    }

  }, [archivos]);

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

      if (e.target.name === 'cedula') {
        setCedula({
          ...cedula,
          ...data
        });
      } else {
        setHojaVida({
          ...hojaDeVida,
          ...data
        });
      }

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

  const handleSubmit = async (e, tipo) => {

    e.preventDefault();

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {
      if (!cedula.file && !hojaDeVida.file) throw new Error('Archivo no seleccionado');
      if (!cedula.change && !hojaDeVida.change) throw new Error('Escoger otro documento para subir');

      const formData = new FormData();

      formData.append('empleado_id', currentUser.id);
      formData.append('tipo', tipo);

      if (tipo === 'cedula') {

        formData.append('nombre_contractual', cedula.filename);
        formData.append('archivo', cedula.file);
        formData.append('nombre_archivo', cedula.file.name);

      } else {

        formData.append('nombre_contractual', hojaDeVida.filename);
        formData.append('archivo', hojaDeVida.file);
        formData.append('nombre_archivo', hojaDeVida.file.name);

      }

      const rs = await crearArchivo(formData);

      snackbar.message = rs.message ?? 'Documento subido correctamente';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al subir el documento';
      snackbar.alert.color = 'error';

    } finally {

      if (tipo === 'cedula') setCedula({ ...cedula, change: false, uploaded: true });
      else setHojaVida({ ...hojaDeVida, change: false, uploaded: true });

      dispatch(openSnackbar(snackbar));

    }


  };

  // Hacer la peticion para aceptar el archivo
  const handleAceptar = async (id, documento) => {

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      const rs = await updateArchivo(id, { documento });

      snackbar.message = rs.message;
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al subir el documento';
      snackbar.alert.color = 'error';

    } finally {

      dispatch(openSnackbar(snackbar));
      setAcceptance({ ...acceptance, [documento]: true });

    }

  };

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item xs={12}>
          <h1>Cargando archivos</h1>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <MainCard title="Documentos contractuales">
            <List sx={{ py: 0 }}>
              <form onSubmit={(e) => handleSubmit(e, 'cedula')}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3} paddingY={2}>
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <InputLabel id="copiaCedula" htmlFor="cedula">Copia de Cédula</InputLabel>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <Button component="label" disabled={cedula.uploaded} variant="contained" startIcon={<CloudUpload />}>
                        Cargar archivo
                        <VisuallyHiddenInput type="file" name="cedula" onChange={handleChangeFile} />
                      </Button>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" justifyContent="center">
                      <FileVisualizer
                        data={cedula}
                        alt={DOCUMENTOS_CONTRACTUALES.Cedula}
                        accept={false}
                      />
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" justifyContent="end">
                      <Tooltip title="Enviar documento">
                        <div>
                          <IconButton variant="contained" color="primary" type="submit" disabled={cedula.uploaded}>
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
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <InputLabel id="hojaVida" htmlFor="hoja_vida">Hoja de vida</InputLabel>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <Button component="label" disabled={hojaDeVida.uploaded} variant="contained" startIcon={<CloudUpload />}>
                        Cargar archivo
                        <VisuallyHiddenInput type="file" name="hoja_vida" onChange={handleChangeFile} />
                      </Button>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" justifyContent="center">
                      <FileVisualizer
                        data={hojaDeVida}
                        alt={DOCUMENTOS_CONTRACTUALES.CV}
                        accept={false}
                      />
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" justifyContent="end">
                      <Tooltip title="Enviar documento">
                        <div>
                          <IconButton variant="contained" color="primary" type="submit" disabled={hojaDeVida.uploaded}>
                            <FileUpload />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </ListItem>
              </form>
              <ListItem sx={{ paddingY: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} display="flex" justifyContent="center">
                    <FileVisualizer
                      data={{
                        filename: archivos?.acuerdo[0].nombre_contractual,
                        url: URL.createObjectURL(archivos?.acuerdo[0].blob)
                      }}
                      accept={!acceptance.acuerdo}
                      handleAcceptance={() => handleAceptar(currentUser.id, 'acuerdo')}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} display="flex" justifyContent="center">
                    <FileVisualizer
                      data={{
                        filename: archivos.tabla_bonificacion[0].nombre_contractual,
                        url: URL.createObjectURL(archivos?.tabla_bonificacion[0].blob)
                      }}
                      accept={!acceptance.tabla_bonificacion}
                      handleAcceptance={() => handleAceptar(currentUser.id, 'tabla_bonificacion')}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} display="flex" justifyContent="center">
                    <FileVisualizer
                      data={{
                        filename: archivos?.contrato_laboral?.[0].nombre_contractual,
                        url: archivos?.contrato_laboral?.[0].blob ? URL.createObjectURL(archivos?.contrato_laboral?.[0].blob) : ''
                      }}
                      accept={!acceptance.contrato_laboral}
                      handleAcceptance={() => handleAceptar(currentUser.id, 'contrato_laboral')}
                      alt="Contrato Laboral"
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
};

export default DocumentosContractuales;
