import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { FallOutlined, RiseOutlined } from '@ant-design/icons';

// ==============================|| STATISTICSCARD  ||============================== //

const CardVerificacionCitas = ({ color = 'primary', title, count, percentage, isLoss, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            Verificadas {count}
          </Typography>
        </Grid>
        
          
           
          
       
      </Grid>
      <LinearWithLabel value={percentage} color="primary" />
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        Meta mínima{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        
      </Typography>
    </Box>
  </MainCard>
);

CardVerificacionCitas.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  extra: PropTypes.string
};

export default CardVerificacionCitas;
