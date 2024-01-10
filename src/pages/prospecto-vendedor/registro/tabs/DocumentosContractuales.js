/* eslint-disable no-unused-vars */
import { Grid, List, ListItem, useMediaQuery, Button, Tooltip, InputLabel, IconButton } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import FileVisualizer from 'components/FileVisualizer';
import { FileUpload, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useSelector } from 'store';

import useCurrentUser from 'hooks/useCurrentUser';
import useArchivos from 'hooks/vendedor/useArchivos';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

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

const DocumentosContractuales = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [cedula, setCedula] = useState({ filename: undefined, url: '', uploaded: false });
  const [acceptance, setAcceptance] = useState({});

  const user = useCurrentUser();
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
        filename: archivos.cedula?.[0].nombre_contractual,
        url: archivos?.cedula?.[0].blob ? URL.createObjectURL(archivos?.cedula?.[0].blob) : '',
        uploaded: archivos?.cedula?.[0].aceptado ?? false
      });

      setIsLoading(false);

    }

  }, [archivos]);

  console.log('achivo', archivos);

  const handleChangeFile = (e) => {

    if (e.target.files.length === 0) return;

    const filename = e.target.files[0].name;
    const ext = filename.split('.').slice(-1)[0];

    if (ext === 'pdf') {
      setFile(e.target.files[0]);
      setCedula({
        filename: 'Copia de Cédula',
        url: URL.createObjectURL(e.target.files[0]),
        uploaded: cedula.uploaded
      });
      return;
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {
      //remove blank spaces and special charcaters in names and apellidos. Replace them with underscores
      if (!file) throw new Error('Documento no seleccionado');

      function createDirectoryName(names, lastnames, id) {
        const nombres = names.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_ ]/g, '');
        const apellidos = lastnames.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_ ]/g, '');
        const filepath = `${nombres}_${apellidos}_${id}`;
        // console.log('filepath', filepath);
        return filepath;
      }
      
      const filepath = createDirectoryName(user.empleadoInfo.nombres, user.empleadoInfo.apellidos, currentUser.id);

      const formData = new FormData();

      formData.append('nombre_carpeta', filepath);
      formData.append('archivo', file);
      formData.append('nombre_archivo', file.name);
      formData.append('nombre_contractual', 'Copia de Cédula');
      formData.append('tipo', 'cedula');
      formData.append('empleado_id', currentUser.id);

      const rs = await crearArchivo(formData);

      snackbar.message = rs.message;
      snackbar.alert.color = 'success';

      setCedula({
        ...cedula,
        uploaded: true
      });

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al subir el documento';
      snackbar.alert.color = 'error';

      setFile(null);

    }

    dispatch(openSnackbar(snackbar));

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
              <form onSubmit={handleSubmit}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3} paddingY={2}>
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <InputLabel id="copiaCedula">Copia de Cédula</InputLabel>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" alignItems="center">
                      <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                        Cargar archivo
                        <VisuallyHiddenInput type="file" name="file" onChange={handleChangeFile} />
                      </Button>
                    </Grid>
                    <Grid item xs={3} md={3} display="flex" justifyContent="center">
                      <FileVisualizer
                        data={cedula}
                        alt="Copia de cédula"
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
              <ListItem divider={!matchDownMD}>
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
