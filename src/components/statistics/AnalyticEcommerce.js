import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { FallOutlined, RiseOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color = 'primary', title, count, percentage, isLoss, periodo = null, }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h4" color="textSecondary">
        {title}
      </Typography>
      {(periodo != null ? <Typography variant="h5" color="textSecondary">
        {periodo}
      </Typography> : null)}
      <Grid container alignItems="center" display="flex" justifyContent="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
        {(percentage != null) && (
          <Grid item sx={{ paddingLeft: "20px" }}>
            <Chip
              variant="combined"
              color={color}
              icon={
                <>
                  {!isLoss && <RiseOutlined style={{ fontSize: '3 rem', color: 'inherit' }} />}
                  {isLoss && <FallOutlined style={{ fontSize: '3 rem', color: 'inherit' }} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="large"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  extra: PropTypes.string
};

export default AnalyticEcommerce;
