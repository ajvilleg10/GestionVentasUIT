import { Box, Grid, Stack, Typography } from "@mui/material";
import Avatar from "components/@extended/Avatar";
import MainCard from "components/MainCard";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const CardAsistenciaPuntual = ({ isCSGPuntual, isHLPuntual }) => {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Asistencia Puntual
        </Typography>
        <Grid container alignItems="center" justifyContent="center" >
          <Grid item container xs={6} alignItems="center" justifyContent="center">
            <Typography variant="subtitle1">CSG</Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justifyContent="center" >
            <Avatar
              sx={{
                color: isCSGPuntual ? "success.main" : "error.main",
                bgcolor: isCSGPuntual ? "success.lighter" : "error.lighter",
              }}
            >
              {isCSGPuntual ? <CheckOutlined /> : <CloseOutlined />}
            </Avatar>
          </Grid>
          <Grid item container xs={6} alignItems="center" justifyContent="center">
            <Typography variant="subtitle1">HL</Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justifyContent="center">
            <Avatar
              sx={{
                color: isHLPuntual ? "success.main" : "error.main",
                bgcolor: isHLPuntual ? "success.lighter" : "error.lighter",
              }}
            >
              {isHLPuntual ? <CheckOutlined /> : <CloseOutlined />}
            </Avatar>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default CardAsistenciaPuntual;
