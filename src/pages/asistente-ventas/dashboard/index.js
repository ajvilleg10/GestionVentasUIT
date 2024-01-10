import GraficaVerificacionCitas from "./GraficaVerificacionCitas";
import GraficaCoctelIntentos from "./GraficaCoctelIntentos";
import CardVerificacionCitas from "./CardVerificacionCitas";
import CardAsistenciaPuntual from "./CardAsistenciaPuntual";
import Grid from "@mui/material/Grid";
import TablaIndicadoresSemanalesCitas from "./TablaIndicadoresSemanalesCitas";
const Dashboard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardVerificacionCitas
            title="Verificación de Citas Concretadas"
            count="27"
            percentage={59.3}
            extra="23"
          />
        </Grid>
        <Grid item xs={6}>
          <CardAsistenciaPuntual />
        </Grid>
      </Grid>
      <GraficaVerificacionCitas></GraficaVerificacionCitas>
      <GraficaCoctelIntentos></GraficaCoctelIntentos>
    </>
  );
};

export default Dashboard;
