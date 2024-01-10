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

import useUserSeleccionado from 'hooks/administrador/useUserSeleccionado';
import useArchivos from 'hooks/administrador/useArchivos';
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

  const { archivos, crearArchivo, updateArchivo } = useArchivos();
  const user = useUserSeleccionado();

  const [isLoading, setIsLoading] = useState(false);
  const [contratoLaboral, setContratoLaboral] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.Contrato
  });
  const [copiaCedula, setCopiaCedula] = useState({
    ...initialState,
    filename: DOCUMENTOS_CONTRACTUALES.Cedula 
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

    setIsLoading(false);

  }, [archivos]);


  const handleSubmit = async (e, tipo) => {

    e.preventDefault();

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      if (!contratoLaboral.file && !copiaCedula.file) throw new Error('Archivo no seleccionado');
      if (!contratoLaboral.change && !copiaCedula.change) throw new Error('Escoger otro documento para subir');

      const formData = new FormData();

      formData.append('empleado_id', user.empleadoInfo.id);
      formData.append('tipo', tipo);

      if (tipo === 'cedula') {

        formData.append('nombre_contractual', copiaCedula.filename);
        formData.append('archivo', copiaCedula.file);
        formData.append('nombre_archivo', copiaCedula.file.name);

      } else {

        formData.append('nombre_contractual', contratoLaboral.filename);
        formData.append('archivo', contratoLaboral.file);
        formData.append('nombre_archivo', contratoLaboral.file.name);

      }

      const rs = await crearArchivo(formData);

      snackbar.message = rs.message ?? 'Documento subido correctamente';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al subir el documento';
      snackbar.alert.color = 'error';

    } finally {

      if (tipo === 'cedula') setCopiaCedula({ ...copiaCedula, change: false });
      else setContratoLaboral({ ...contratoLaboral, change: false });

      dispatch(openSnackbar(snackbar));

    }

  };

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
      setContratoLaboral({
        ...contratoLaboral,
        aceptado: true
      });

    }

  };

  const handleChangeFile = (e) => {

    if (e.target.files.length === 0) return;
    const filename = e.target.files[0].name;
    const ext = filename.split('.').slice(-1)[0];

    if (ext === 'pdf') {

      const data = {
        change: true,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      };

      if (e.target.name === 'contrato_laboral') {
        setContratoLaboral({
          ...contratoLaboral,
          ...data
        })
      } else {
        setCopiaCedula({
          ...copiaCedula,
          ...data
        })
      }

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
                        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="contrato_laboral" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={contratoLaboral}
                          alt={contratoLaboral.nombre_contractual}
                          handleAcceptance={() => handleAceptar(user.empleadoInfo.id, 'contrato_laboral')}
                          accept={!contratoLaboral.aceptado}
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
                <form onSubmit={(e) => handleSubmit(e, 'cedula')}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3} paddingY={2}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="cedula">Copia de Cédula</InputLabel>
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" alignItems="center">
                        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="cedula" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={copiaCedula}
                          alt={copiaCedula.nombre_contractual}
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
        </>
      )}
    </Grid>
  );
};

export default DocumentosContractuales;
