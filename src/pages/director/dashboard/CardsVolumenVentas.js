
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import CardBarra from "./CardBarra";
const colores = { naraja: "#D4AC0D" };

function CardsVolumenVentas({data}) {

  let datosTotales = {
    vendedores_iniciales: 0,
    vendedores_entrantes: 0 ,
    vendedores_salientes: 0,
    vendedores_finales: {cantidad: 0, meta: 0},
    ventas_nuevas: { cantidad: 0, contratos: 0},
    contratos_inactivos1:  { cantidad: 0, contratos: 0},
    ventas_nuevas_reales: { cantidad: 0, contratos: 0},
    sin_titulo: { nivel: 0, porcentaje: 0, meta: 0},
    renovaciones: {cantidad: 0, contratos: 0},
    contratos_inactivos2: { cantidad: 0, contratos: 0},
    contratos_renovaciones_reales: { cantidad: 0, contratos: 0},
    contratos_por_renovar: { cantidad: 0, porcentaje: 0, meta: 0 },
    volumen_ventas: { cantidad: 0, contratos: 0},
    contratos_inactivos3: {cantidad: 0, porcentaje: 0}, //No sabemos como actualizar este porcentaje
    volumen_ventas_reales: { cantidad: 0, nivel: 0, porcentaje: 0}, //No sabemos como actualizar este porcentaje
    bonificacion: {nivel: 0, meta: 0, valor: 0, porcentaje:0}  //No sabemos como actualizar este porcentaje
  };


  return (
    <TableContainer
      sx={{ width: "60%", overflowX: "auto" }}
      style={{ width: "100%" }}
    >

      <Table>
        <TableBody>
          <TableRow>
            <CardBarra
              titulo="Vendedores Iniciales"
              texto= {data.vendedores_iniciales}
              //whitFooter={fal}
              //footer='contratos 20'
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Vendedores Entrantes"
              texto={data.vendedores_entrantes}
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Vendedores Salientes"
              texto= {data.vendedores_salientes}
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Vendedores Finales"
              texto= {data.vendedores_salientes}
              whitFooter={true}
              footer= {`Meta ${data.vendedores_salientes.meta}`}
              colorTitulo="blue"
            />
          </TableRow>
          <TableRow>
            <CardBarra
              titulo="Ventas Nuevas"
              texto= {`$ ${data.ventas_nuevas.cantidad}`}
              whitFooter={true}
              footer= {`Contratos ${data.ventas_nuevas.contratos}`}
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Contratos Inactivos"
              texto= {`$ ${data.contratos_inactivos1.cantidad}`}
              whitFooter={true}
              footer= {`Contratos ${data.contratos_inactivos1.contratos}`}
              colorTitulo="red" //#D4AC0D
            />
            <CardBarra
              titulo="Ventas Nuevas Reales"
              texto= {`$ ${data.ventas_nuevas_reales.cantidad}`}
              whitFooter={true}
              footer= {`Contratos ${data.ventas_nuevas_reales.contratos}`}
              colorTitulo="#D4AC0D"
            />

            <CardBarra
              titulo="No se cual es el titulo"
              texto= {`Nivel ${data.sin_titulo.nivel}`}
              whitBar={true}
              whitFooter={true}
              porcentaje={data.sin_titulo.porcentaje}
              footer= {`Meta $ ${data.sin_titulo.meta}`}
              colorTitulo="#D4AC0D"
            />
          </TableRow>
          <TableRow>
            <CardBarra
              titulo="Renovaciones"
              texto= {`$ ${data.renovaciones.cantidad}`}
              whitFooter={true}
              footer= {`Contratos ${data.renovaciones.contratos}`}
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Contratos Inactivos"
              texto= {`$ ${data.contratos_inactivos2.cantidad}`}
              whitFooter={true}
              footer= {`Contratos ${data.contratos_inactivos2.contratos}`}
              colorTitulo="red"
            />

            <CardBarra
              titulo="Contratos Renovaciones Reales"
              texto= {`$ ${data.contratos_renovaciones_reales.cantidad}`}
              whitFooter={true}
              footer={`Contratos ${data.contratos_renovaciones_reales.contratos}`}
              colorTitulo={colores.naraja}
            />

            <CardBarra
              titulo="Contratos Por Renovar"
              texto={ data.contratos_por_renovar.cantidad}
              whitBar={true}
              whitFooter={true}
              porcentaje={data.contratos_por_renovar.porcentaje}
              footer={`Meta ${data.contratos_por_renovar.meta}`}
              colorTitulo="blue"
            />
          </TableRow>
          <TableRow>
            <CardBarra
              titulo="Volumen de Ventas"
              texto={`$ ${data.volumen_ventas.cantidad}`}
              whitFooter={true}
              footer={`Contratos ${data.volumen_ventas.contratos}`}
              colorTitulo="blue"
            />
            <CardBarra
              titulo="Contratos inactivos"
              texto={`$ ${data.contratos_inactivos3.cantidad}`}
              whitFooter={true}
              footer={`${data.contratos_inactivos3.porcentaje} % increase`}
              colorTitulo="red"
            />
            <CardBarra
              titulo="Volumen de Ventas Reales"
              texto={`$ ${data.volumen_ventas_reales.cantidad}`}
              whitFooter={true}
              footer={`Nivel ${data.volumen_ventas_reales.nivel} - ${data.volumen_ventas_reales.porcentaje}%`}
              colorTitulo={colores.naraja}
            />{" "}
            <CardBarra
              titulo="Bonificación"
              texto={`Nivel ${data.bonificacion.nivel}`}
              whitBar={true}
              whitFooter={true}
              porcentaje={data.bonificacion.porcentaje}
              footer={
                <Typography align="center">
                  <Typography>Meta {`$ ${data.bonificacion.meta}`}</Typography>
                  <Typography>Valor Bonificación {`$ ${data.bonificacion.valor}`}</Typography>
                </Typography>
              }
              colorTitulo="blue"
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CardsVolumenVentas;