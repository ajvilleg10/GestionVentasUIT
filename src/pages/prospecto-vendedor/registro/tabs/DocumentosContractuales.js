/* eslint-disable no-unused-vars */
import { Grid, List, ListItem, useMediaQuery, FormControl, InputLabel, TextField, IconButton } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import FileVisualizer from 'components/FileVisualizer';
import { FileUpload } from '@mui/icons-material';

import useArchivos from 'hooks/vendedor/useArchivos';
import useCurrentUser from 'hooks/useCurrentUser';

import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useEffect, useState } from 'react';

// import { FileUpload, CancelRounded } from '@mui/icons-material';
// TODO: Recuperar archivos desde el backend
const DocumentosContractuales = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  // TODO: Faltan los archivos que la asistente subio para el prospecto
  const { copiaCedula, archivosPorCuenta, contrato, createArchivo } = useArchivos();

  const userP = useCurrentUser();
  const [user, setUser] = useState({});

  useEffect(() => { 

    setArchivoData({
      nombre: copiaCedula?.nombre,
      url: copiaCedula?.ruta_archivo
    });

    setUser(userP); 
  }, [userP, copiaCedula]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [archivoData, setArchivoData] = useState({});

  const handleTablaBonificacionesAcceptance = () => {
    console.log('Tabla de bonificaciones aceptada');
  };

  const handleAcceptance = () => {
    console.log('Aceptado')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('archivo', selectedFile);
    formData.append('nombre_archivo', selectedFile.name);
    formData.append('nombre', 'Copia de Cédula');
    formData.append('uploaded', true);
    formData.append('uploaded_by', user?.empleadoInfo?.id);
    formData.append('empleado_id', user?.empleadoInfo?.id);

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

      setArchivoData({
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
    if (e.target.files.length === 0) return;

    setIsFileUploaded(false);

    const filename = e.target.files[0].name;
    const ext = filename.split('.').slice(-1)[0]; // Last item

    if (ext === 'pdf') {
      setSelectedFile(e.target.files[0]);
      setArchivoData({
        nombre: 'Copia de Cédula',
        url: URL.createObjectURL(e.target.files[0])
      });
      return;
    }
    // setSelectedFile(null);
  };

  console.log('renders');
  console.log(archivoData);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Documentos contractuales">
          <List sx={{ py: 0 }}>
            <form onSubmit={handleSubmit}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3} paddingY={2}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="copiaCedula">Copia de Cédula</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField onChange={handleFile} type="file" name="copiaCedula" id="copiaCedula" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" justifyContent="center">
                    {selectedFile || Object.keys(archivoData).length != 0 ? (
                      <FileVisualizer data={{ filename: archivoData.nombre, url: archivoData.url }} accept={false} alt="Copia De Cédula"/>
                    ) : (
                      <p>Archivo no seleccionado</p>
                    )}
                  </Grid>
                  <Grid item xs={12} md={1} display="flex" justifyContent="center">
                    <IconButton disabled={selectedFile && !isFileUploaded ? false : true} type="submit" color="primary" variant="contained">
                      <FileUpload />
                    </IconButton>
                    {/*}<Button disabled={selectedFile && !isFileUploaded ? false : true} type="submit" color="primary" variant="contained"> Subir </Button>*/}
                    {/* <IconButton disabled={!selectedFile} color="error" variant="contained" onClick={handleDeleteFile}> */}
                    {/*   <CancelRounded /> */}
                    {/* </IconButton> */}
                  </Grid>
                </Grid>
              </ListItem>
            </form>
            <ListItem divider={!matchDownMD}>
              <Grid container spacing={3}>
                { archivosPorCuenta && 
                  archivosPorCuenta.map((a) => (
                    <Grid key={a.id} item xs={12} md={4} display="flex" justifyContent="center">
                      <FileVisualizer
                        data={{
                          filename: a.nombre,
                          url: a.ruta_archivo 
                        }}
                        accept
                        handleAcceptance={handleAcceptance}
                      />
                    </Grid>
                  ))
                }
                {/* <Grid item xs={12} md={4} display="flex" justifyContent="center"> */}
                {/*   <FileVisualizer */}
                {/*     data={{ */}
                {/*       filename: 'Acuerdo De Vendedor', */}
                {/*       url: 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview' */}
                {/*     }} */}
                {/*     accept */}
                {/*     handleAcceptance={handleAcuerdoUsuarioAcceptance} */}
                {/*   /> */}
                {/* </Grid> */}
                {/* <Grid item xs={12} md={4} display="flex" justifyContent="center"> */}
                {/*   <FileVisualizer */}
                {/*     data={{ */}
                {/*       filename: 'Tabla De Bonificaciones', */}
                {/*       url: 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview' */}
                {/*     }} */}
                {/*     accept */}
                {/*     handleAcceptance={handleTablaBonificacionesAcceptance} */}
                {/*   /> */}
                {/* </Grid> */}
                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                  <FileVisualizer
                    data={{
                      filename: contrato.nombre,
                      url: contrato.ruta_archivo 
                    }}
                    accept
                    alt='Contrato Laboral'
                    handleAcceptance={handleTablaBonificacionesAcceptance}
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

// <Button disabled={selectedFile && !isFileUploaded ? false : true} type="submit" color="primary" variant="contained"> Subir </Button>
// <Button color="error" variant="contained" onClick={handleDeleteFile}> hello </Button>
// <ListItem divider={!matchDownMD}>
//   <Grid container spacing={3}>
//     <Grid item xs={12} md={3} display="flex" alignItems="center">
//       <InputLabel id="contratoLaboral">Contrato Laboral</InputLabel>
//     </Grid>
//     <Grid item xs={12} md={4}>
//       <FormControl fullWidth>
//         <TextField type="file" />
//       </FormControl>
//     </Grid>
//   </Grid>
// </ListItem>
// import axios from 'utils/axios';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
// import AllPagesPDFViewer from 'components/AllPagesPdf';
// import samplePDF from 'assets/sample.pdf';
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
//URL.createObjectURL(selectedFile)
