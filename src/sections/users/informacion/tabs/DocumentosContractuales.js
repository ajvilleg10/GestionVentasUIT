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

import useArchivos from 'hooks/useArchivos';

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

  const [contratoLaboral, setContratoLaboral] = useState({});
  const [archivosComunes, setArchivosComunes] = useState([]);

  const currentUser = useSelector(state => state.user);
  const { archivos, crearArchivo, updateArchivo } = useArchivos();

  useEffect(() => {

    setContratoLaboral({
      ...contratoLaboral,
      nombre_contractual: archivos?.contrato_laboral?.nombre_contractual ?? contratoLaboral.nombre_contractual,
      aceptado: archivos?.contrato_laboral?.aceptado ?? false,
      url: archivos?.contrato_laboral?.blob ? URL.createObjectURL(archivos.contrato_laboral.blob) : ''
    });

    setCedula({
      ...cedula,
      nombre_contractual: archivos?.cedula?.nombre_contractual ?? cedula.nombre_contractual,
      aceptado: archivos?.cedula?.aceptado ?? false,
      url: archivos?.cedula?.blob ? URL.createObjectURL(archivos.cedula.blob) : ''
    });

    setHojaVida({
      ...hojaDeVida,
      nombre_contractual: archivos?.hoja_vida?.nombre_contractual ?? hojaDeVida.nombre_contractual,
      aceptado: archivos?.hoja_vida?.aceptado ?? false,
      url: archivos?.hoja_vida?.blob ? URL.createObjectURL(archivos.hoja_vida.blob) : ''
    });

    const names = Object.keys(archivos ?? {}).filter((a) => a !== 'cedula' && a !== 'contrato_laboral' && a !== 'hoja_vida');
    setArchivosComunes(names);

    const accObj = {};
    for (const n of names) {
      accObj[n] = archivos[n].aceptado;
    }

    setAcceptance({
      contrato_laboral: archivos?.contrato_laboral?.aceptado ?? false,
      ...accObj
    });

    setIsLoading(false);

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

  // console.log('acceptance', acceptance);
  // console.log('archivos', archivos);

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
                          data={cedula}
                          alt={cedula.nombre_contractual}
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
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3} paddingY={2}>
                    {archivosComunes?.map((a) => {

                      const data = {
                        url: URL.createObjectURL(archivos[a].blob),
                        filename: archivos[a].nombre_contractual
                      };

                      return (
                        <Grid item xs={12} md={4} key={a} display="flex" alignItems="center">
                          <FileVisualizer
                            data={data}
                            handleAcceptance={() => handleAceptar(currentUser.empleadoInfo.id, archivos[a].tipo)}
                            accept={!acceptance[a]}
                          />
                        </Grid>
                      );
                    })}
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <FileVisualizer
                        data={contratoLaboral}
                        alt={DOCUMENTOS_CONTRACTUALES.Contrato}
                        handleAcceptance={() => handleAceptar(currentUser.empleadoInfo.id, 'contrato_laboral')}
                        accept={!acceptance.contrato_laboral}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </>
      )}
    </Grid>
  );

};

export default DocumentosContractuales;
