/* eslint-disable no-unused-vars */
// material-ui
// eslint-disable-next-line no-unused-vars
import { Grid, List, ListItem, useMediaQuery, FormControl, InputLabel, Button, Input, TextField } from '@mui/material';
import axios from 'axios';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
// import { FormattedMessage } from 'react-intl';

// import AllPagesPDFViewer from 'components/AllPagesPdf';
// import samplePDF from 'assets/sample.pdf';

import AcuerdoUsuarioDialog from '../dialogs/AcuerdoUsuarioDialog';
import TablaBonificacionesDialog from '../dialogs/TablaBonificacionesDialog';

// function createMarkup(html) {
//   return { __html: html };
// }

const mockOEmbedResponse = {
  type: 'photo',
  flickr_type: 'photo',
  title: 'ZB8T0193',
  author_name: '‮‭‬bees‬',
  author_url: 'https://www.flickr.com/photos/bees/',
  width: 1024,
  height: 683,
  url: 'https://live.staticflickr.com/3123/2341623661_7c99f48bbf_b.jpg',
  web_page: 'https://www.flickr.com/photos/bees/2341623661/',
  thumbnail_url: 'https://live.staticflickr.com/3123/2341623661_7c99f48bbf_q.jpg',
  thumbnail_width: 150,
  thumbnail_height: 150,
  web_page_short_url: 'https://flic.kr/p/4yVr8K',
  license: 'All Rights Reserved',
  license_id: 0,
  html: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/bees/2341623661/" title="ZB8T0193 by ‮‭‬bees‬, on Flickr"><img src="https://live.staticflickr.com/3123/2341623661_7c99f48bbf_b.jpg" width="1024" height="683" alt="ZB8T0193"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>',
  version: '1.0',
  cache_age: 3600,
  provider_name: 'Flickr',
  provider_url: 'https://www.flickr.com/'
};

const DocumentosContractuales = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [acuerdoUsuario, setAcuerdoUsuario] = useState();
  const [tablaBonificaciones, setTablaBonificaciones] = useState();

  const acuerdoUsuarioPdfURL = 'https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview';

  const handleAcuerdoUsuarioAcceptance = () => {
    console.log('Acuerdo de usuario aceptado');
  };

  const handleTablaBonificacionesAcceptance = () => {
    console.log('Tabla de bonificaciones aceptada');
  };

  useEffect(() => {
    const getOEmbedResponse = async () => {
      // const response = await axios.get(
      //   'https://www.flickr.com/services/oembed/?format=json&url=http%3A//www.flickr.com/photos/bees/2341623661/'
      // );
      // console.log(response);
      setAcuerdoUsuario(mockOEmbedResponse);
    };
    getOEmbedResponse();
  }, []);

  useEffect(() => {
    const getOEmbedResponse = async () => {
      // const response = await axios.get(
      //   'https://www.flickr.com/services/oembed/?format=json&url=http%3A//www.flickr.com/photos/bees/2341623661/'
      // );
      // console.log(response);
      setTablaBonificaciones(mockOEmbedResponse);
    };
    getOEmbedResponse();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Información Personal">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="contratoLaboral">Contrato Laboral</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField type="file" />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="copiaCedula">Copia de Cedula</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField type="file" />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} display="flex" alignItems="center">
                      <AcuerdoUsuarioDialog handleAcceptance={handleAcuerdoUsuarioAcceptance} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TablaBonificacionesDialog handleAcceptance={handleTablaBonificacionesAcceptance} />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentosContractuales;
