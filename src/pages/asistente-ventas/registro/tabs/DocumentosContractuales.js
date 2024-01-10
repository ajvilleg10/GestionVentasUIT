/* eslint-disable no-unused-vars */
import { Grid, List, ListItem, useMediaQuery, FormControl, InputLabel, IconButton, TextField } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import FileVisualizer from 'components/FileVisualizer';
import { FileUpload } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import useArchivos from 'hooks/asistente-ventas/useArchivos';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

const DocumentosContractuales = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [contratoData, setContratoData] = useState({});

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { copiaCedula, archivosPorCuenta, contrato, createArchivo } = useArchivos();

  useEffect(() => {

    setContratoData({
      nombre: contrato.nombre,
      url: contrato.ruta_archivo
    });

  }, [contrato]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('archivo', selectedFile);
    formData.append('nombre_archivo', selectedFile.name);
    formData.append('nombre', 'Contrato Laboral');
    formData.append('uploaded', true);
    formData.append('uploaded_by', user.id);
    formData.append('empleado_id', copiaCedula.empleado_id);

    try {

      const rs = await createArchivo(formData);

      dispatch(
        openSnackbar({
          open: true,
          message: 'Archivo subido con éxito',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );

      setContratoData({
        nombre: rs.nombre,
        url: rs.ruta_archivo
      });

    } catch (error) {

      console.error(error);
      dispatch(
        openSnackbar({
          open: true,
          message: error.error,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );

    } finally {

      setIsFileUploaded(true);

    }

  }

  const handleFile = (e) => {
    if (e.target.files.length === 0)  return;

    setIsFileUploaded(false);

    const filename = e.target.files[0].name;
    const ext = filename.split('.').slice(-1)[0]; // Last item

    if (ext === 'pdf') {
      setSelectedFile(e.target.files[0]);
      setContratoData({
        nombre: 'Contrato Laboral',
        url: URL.createObjectURL(e.target.files[0])
      });
      return;
    }

    // setSelectedFile(null);
  };

  console.log('renders');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Documentos contractuales">
          <List sx={{ py: 0 }}>
            <form onSubmit={handleSubmit}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="contratoLaboral">Contrato Laboral</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField onChange={handleFile} type="file" name="contratoLaboral" id="contratoLaboral" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3} alignItems="center" justifyContent="center" display="flex">
                    {selectedFile || Object.keys(contratoData).length != 0 ? (
                      <FileVisualizer data={{ filename: contratoData.nombre, url: contratoData.url }} accept={false} alt="Contrato Laboral" />
                    ) : (
                      <p>Archivo no seleccionado</p>
                    )}
                  </Grid>
                  <Grid item xs={12} md={2} alignItems="center" justifyContent="center" display="flex">
                    <IconButton disabled={selectedFile && !isFileUploaded ? false : true} type="submit" color="primary" variant="contained">
                      <FileUpload />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            </form>

            {archivosPorCuenta && 
              archivosPorCuenta.map((a) => (
              <ListItem key={a.id} divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel>{a.nombre}</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4} alignItems="center" justifyContent="center" display="flex">
                    <FileVisualizer
                      data={{
                        filename: a.nombre,
                        url: a.ruta_archivo
                      }}
                      accept={false}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              ))}
            {/* <ListItem divider={!matchDownMD}> */}
            {/*   <Grid container spacing={3}> */}
            {/*     <Grid item xs={12} md={3} display="flex" alignItems="center"> */}
            {/*       <InputLabel id="acuerdoDeVendedor">Acuerdo de Vendedor</InputLabel> */}
            {/*     </Grid> */}
            {/*     <Grid item xs={12} md={4} alignItems="center" justifyContent="center" display="flex"> */}
            {/*       <FileVisualizer */}
            {/*         data={{ */}
            {/*           filename: 'Acuerdo De Vendedor', */}
            {/*           url: 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview' */}
            {/*         }} */}
            {/*         accept={false} */}
            {/*       /> */}
            {/*     </Grid> */}
            {/*   </Grid> */}
            {/* </ListItem> */}
            {/* <ListItem divider={!matchDownMD}> */}
            {/*   <Grid container spacing={3}> */}
            {/*     <Grid item xs={12} md={3} display="flex" alignItems="center"> */}
            {/*       <InputLabel id="tablaDeBonificacion">Tabla de Bonificaciones</InputLabel> */}
            {/*     </Grid> */}
            {/*     <Grid item xs={12} md={4} alignItems="center" justifyContent="center" display="flex"> */}
            {/*       <FileVisualizer */}
            {/*         data={{ */}
            {/*           filename: 'Tabla De Bonificaciones', */}
            {/*           url: 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview' */}
            {/*         }} */}
            {/*         accept={false} */}
            {/*       /> */}
            {/*     </Grid> */}
            {/*   </Grid> */}
            {/* </ListItem> */}
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
                <Grid item xs={12} md={4}>
                  <FileVisualizer
                    data={{
                      filename: copiaCedula.nombre,
                      url: copiaCedula.ruta_archivo
                    }}
                    accept={false}
                    alt="Copia de Cédula'"
                  />
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DocumentosContractuales;

// useEffect(() => {
//   const getOEmbedResponse = async () => {
//     // const response = await axios.get(
//     //   'https://www.flickr.com/services/oembed/?format=json&url=http%3A//www.flickr.com/photos/bees/2341623661/'
//     // );
//     // console.log(response);
//     setAcuerdoUsuario(mockOEmbedResponse);
//   };
//   getOEmbedResponse();
// }, []);
// useEffect(() => {
//   const getOEmbedResponse = async () => {
//     // const response = await axios.get(
//     //   'https://www.flickr.com/services/oembed/?format=json&url=http%3A//www.flickr.com/photos/bees/2341623661/'
//     // );
//     // console.log(response);
//     setTablaBonificaciones(mockOEmbedResponse);
//   };
//   getOEmbedResponse();
// }, []);
// import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
// import AllPagesPDFViewer from 'components/AllPagesPdf';
// import samplePDF from 'assets/sample.pdf';
// import AcuerdoUsuarioDialog from '../dialogs/AcuerdoUsuarioDialog';
// import TablaBonificacionesDialog from '../dialogs/TablaBonificacionesDialog';
// function createMarkup(html) {
//   return { __html: html };
// }
// const mockOEmbedResponse = {
//   type: 'photo',
//   flickr_type: 'photo',
//   title: 'ZB8T0193',
//   author_name: '‮‭‬bees‬',
//   author_url: 'https://www.flickr.com/photos/bees/',
//   width: 1024,
//   height: 683,
//   url: 'https://live.staticflickr.com/3123/2341623661_7c99f48bbf_b.jpg',
//   web_page: 'https://www.flickr.com/photos/bees/2341623661/',
//   thumbnail_url: 'https://live.staticflickr.com/3123/2341623661_7c99f48bbf_q.jpg',
//   thumbnail_width: 150,
//   thumbnail_height: 150,
//   web_page_short_url: 'https://flic.kr/p/4yVr8K',
//   license: 'All Rights Reserved',
//   license_id: 0,
//   html: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/bees/2341623661/" title="ZB8T0193 by ‮‭‬bees‬, on Flickr"><img src="https://live.staticflickr.com/3123/2341623661_7c99f48bbf_b.jpg" width="1024" height="683" alt="ZB8T0193"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>',
//   version: '1.0',
//   cache_age: 3600,
//   provider_name: 'Flickr',
//   provider_url: 'https://www.flickr.com/'
// };
// const [acuerdoUsuario, setAcuerdoUsuario] = useState();
// const [tablaBonificaciones, setTablaBonificaciones] = useState();
// const acuerdoUsuarioPdfURL = 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview';
