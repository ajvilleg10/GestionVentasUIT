import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormLabel, Grid, TextField, Stack, Typography } from '@mui/material';

// project import
// import ProfileTab from './ProfileTab';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

import { ThemeMode } from 'config';

// assets
import { CameraOutlined } from '@ant-design/icons';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(avatarImage(`./avatar.svg`));

  const prospectoVendedor = useProspectoSeleccionado();

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.light, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Subir imagen</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h6">
                {prospectoVendedor?.empleadoInfo?.nombres + ' ' + prospectoVendedor?.empleadoInfo?.apellidos}
              </Typography>
              <Typography color="secondary">{prospectoVendedor?.tipoCuentaInfo?.nombre_tipo}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func,
  prospectoVendedor: PropTypes.object
};

export default ProfileTabs;
