import { DoNotDisturbOnTotalSilenceSharp } from '@mui/icons-material';
import { TableCell, Typography } from '@mui/material';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { isEmpty } from 'lodash';



function CardBarra( { titulo, total, nivel, meta, porcentaje, colorTitulo}){
    return (
    <TableCell
    style={{ width: "100px", height: "100px", border: "40px solid #c1e6df" }}
    >
    <Typography align="center">
        <Typography align="center" style={{ color: colorTitulo }}>
        {titulo}
        </Typography>
        | {total}
    </Typography>

    <Typography variant="h5" align="center">
        Nivel {nivel}
    </Typography>

    <LinearWithLabel value={ porcentaje } color="primary" />

    <Typography align="center">Meta Nivel {nivel} : {meta}</Typography>

    </TableCell>
    );
    
}

export default CardBarra;

