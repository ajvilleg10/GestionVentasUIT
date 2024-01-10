/* eslint-disable no-unused-vars */
import { Grid, List, ListItem, useMediaQuery, InputLabel, IconButton, Tooltip, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { FileUpload, CloudUpload } from '@mui/icons-material';
import FileVisualizer from 'components/FileVisualizer';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import useArchivos from 'hooks/asistente-ventas/useArchivos';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';
import useUserSeleccionado from 'hooks/administrador/useUserSeleccionado';

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

  const user = useUserSeleccionado();
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({
    contratoLaboral: undefined,
    copiaDeCedula: undefined
  });

  // const [file, setFile] = useState(null);

  const [contratoLaboral, setContratoLaboral] = useState({ filename: undefined, url: '', change: false, aceptado: false });
  const [copiaCedula, setCopiaCedula] = useState({ filename: undefined, url: '' });

  // const { archivos, crearArchivo } = useArchivos();
  // useEffect(() => {
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
  // }, [archivos]);

  const handleSubmit = async (e, tipo) => {

    e.preventDefault();

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      if (!files.contratoLaboral && !files.copiaDeCedula) throw new Error('Archivo no seleccionado');

      const formData = new FormData();
      const filepath = `${user.empleadoInfo.nombres.replaceAll(' ', '_').toLowerCase()}_${user.empleadoInfo.apellidos.replaceAll(' ', '_').toLowerCase()}_${user.empleadoInfo.id}`

      formData.append('nombre_carpeta', filepath);
      formData.append('empleado_id', user.empleadoInfo.id);
      formData.append('tipo', tipo);

      if (tipo === 'cedula') {

        formData.append('nombre_contractual', 'Copia de Cédula');
        formData.append('archivo', files.copiaDeCedula);
        formData.append('nombre_archivo', files.copiaDeCedula.name);

      } else {

        formData.append('nombre_contractual', 'Contrato Laboral');
        formData.append('archivo', files.contratoLaboral);
        formData.append('nombre_archivo', files.contratoLaboral.name);

      }

      // const filepath = buildFolderName(); 
      // if(!files.contratoLaboral && !files.copiaDeCedula) throw new Error('Archivo no seleccionado');

    } catch (error) {

      console.error(error);

    }

    // let isError = true;
    // try {
    //   if (!file) throw new Error('Documento no seleccionado');
    //   if (!contratoLaboral.change) {
    //     isError = false;
    //     throw new Error('Escoger un archivo diferente');
    //   }
    //   const filepath = `${prospecto.empleadoInfo.nombres.toLowerCase()}_${prospecto.empleadoInfo.apellidos.toLowerCase()}_${prospecto.empleadoInfo.id}`
    //   const formData = new FormData();
    //   formData.append('nombre_carpeta', filepath); x
    //   formData.append('archivo', file);
    //   formData.append('nombre_archivo', file.name);
    //   formData.append('nombre_contractual', 'Contrato Laboral');x
    //   formData.append('tipo', 'contrato_laboral');x
    //   formData.append('empleado_id', prospecto.empleadoInfo.id);x

    //   const rs = await crearArchivo(formData);

    //   snackbar.message = rs.message ?? 'Contrato laboral subido con éxito';
    //   snackbar.alert.color = 'success';

    //   setContratoLaboral({ ...contratoLaboral, change: false });

    // } catch (error) {

    //   console.error(error);

    //   snackbar.message = error.message ?? 'Error al subir el documento';
    //   snackbar.alert.color = 'error';

    //   if (isError) setFile(null);

    // }

    // dispatch(openSnackbar(snackbar));

    // if (tipo === 'cedula') {
    //   console.log('Se va a enviar la cedula');
    // } else {
    //   console.log('Se va a enviar el contrato');
    // }
    // console.log('Files', files);
    // console.log('Handle archivo');
    // console.log(e.target.name);
  };

  const handleChangeFile = (e) => {

    setFiles({
      ...files,
      [e.target.name]: {
        hola: "Buenas"
      }
    });

    // if (e.target.files.length === 0) return;
    // const filename = e.target.files[0].name;
    // const ext = filename.split('.').slice(-1)[0];
    // if (ext === 'pdf') {
    //   setFile(e.target.files[0]);
    //   setContratoLaboral({
    //     ...contratoLaboral,
    //     nombre: 'Contrato Laboral',
    //     url: URL.createObjectURL(e.target.files[0]),
    //     change: true
    //   });
    //   return;
    // }

  };

  console.log(files);

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
                        <InputLabel htmlFor="contratoLaboral">Contrato Laboral</InputLabel>
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" alignItems="center">
                        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="contratoLaboral" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={contratoLaboral}
                          alt="Contrato Laboral"
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
                <form onSubmit={(e) => handleSubmit(e, 'cedula')}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3} paddingY={2}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="copiaDeCedula">Copia de Cédula</InputLabel>
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" alignItems="center">
                        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                          Cargar archivo
                          <VisuallyHiddenInput type="file" name="copiaDeCedula" onChange={handleChangeFile} />
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                        <FileVisualizer
                          data={copiaCedula}
                          alt="Copia de Cédula"
                          accept={false}
                        />
                      </Grid>
                      <Grid item xs={3} md={3} display="flex" justifyContent="end">
                        <Tooltip title="Enviar documento">
                          <div>
                            <IconButton variant="contained" color="primary" type="submit" disabled={copiaCedula.aceptado}>
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
