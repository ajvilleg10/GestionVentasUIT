import { DoNotDisturbOnTotalSilenceSharp } from "@mui/icons-material";
import { TableCell, Typography } from "@mui/material";
import LinearWithLabel from "components/@extended/progress/LinearWithLabel";
import { isEmpty } from "lodash";

function CardBarra({
  titulo,
  texto,
  porcentaje,
  colorTitulo,
  footer,
  whitFooter = false,
  whitBar = false,
}) {
  return (
    
    <TableCell
      style={{ width: "30px", height: "30px", border: "40px solid #c1e6df" }}
    >
      <Typography align="center">
        <Typography align="center" style={{ color: colorTitulo }}>
          {titulo}
        </Typography>
      </Typography>

      <Typography variant="h3" align="center">
        {texto}
      </Typography>

      {whitBar && <LinearWithLabel value={porcentaje} color="primary" />}

      {whitFooter && (
        <Typography align="center"> 
          {footer}
        </Typography>
      )}
    </TableCell>
  );
}

export default CardBarra;
