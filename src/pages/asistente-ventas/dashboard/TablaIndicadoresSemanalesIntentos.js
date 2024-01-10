import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import NumericFormat from "react-number-format";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dot from "components/@extended/Dot";

const data = {
  1: {
    contacto1: {
      nombre: "Jon Conor",
      llamadas_whatsapp: 2,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 1,
      meta_alcanzada: true,
    },
    contacto2: {
      nombre: "Narto",
      llamadas_whatsapp: 1,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 1,
      meta_alcanzada: true,
    },
    contacto3: {
      nombre: "Boruto",
      llamadas_whatsapp: 1,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 2,
      meta_alcanzada: true,
    },
  },
  2: {
    contacto3: {
      nombre: "Jon Conor",
      llamadas_whatsapp: 2,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 1,
      meta_alcanzada: true,
    },
    contacto4: {
      nombre: "Narto",
      llamadas_whatsapp: 2,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 1,
      meta_alcanzada: true,
    },
    contacto5: {
      nombre: "Boruto",
      llamadas_whatsapp: 1,
      mensaje_whatsapp: 1,
      email: 1,
      llamadas_telefonicas: 2,
      meta_alcanzada: true,
    },
  },
};
// Más semanas aquí

// Procesa los datos de 'data' para calcular las sumas
const calculateSummaries = (data) => {
  return Object.keys(data).map((semana) => {
    const weekData = data[semana];
    const sumaContactos = Object.keys(weekData).length;
    const sumaLlamadasWhatsapp = Object.keys(weekData).reduce(
      (sum, contacto) => {
        return sum + weekData[contacto].llamadas_whatsapp;
      },
      0
    );
    const sumaMensajesWhatsapp = Object.keys(weekData).reduce(
      (sum, contacto) => {
        return sum + weekData[contacto].mensaje_whatsapp;
      },
      0
    );
    const sumaEmail = Object.keys(weekData).reduce((sum, contacto) => {
      return sum + weekData[contacto].email;
    }, 0);
    const sumaLlamadasTelefonicas = Object.keys(weekData).reduce(
      (sum, contacto) => {
        return sum + weekData[contacto].llamadas_telefonicas;
      },
      0
    );
    const metaAlcanzada = Object.keys(weekData).every((contacto) => {
      return weekData[contacto].meta_alcanzada;
    });
    return {
      semana,
      sumaContactos,
      sumaLlamadasWhatsapp,
      sumaMensajesWhatsapp,
      sumaEmail,
      sumaLlamadasTelefonicas,
      metaAlcanzada,
    };
  });
};

const dataSummaries = calculateSummaries(data);

function createData(
  semana,
  contacto,
  email,
  mensajesWhatsapp,
  llamadasWhatsapp,
  llamadasTelefonicas,
  metaAlcanzada
) {
  return {
    semana,
    contacto,
    email,
    mensajesWhatsapp,
    llamadasWhatsapp,
    llamadasTelefonicas,
    metaAlcanzada,
  };
}

const rows = dataSummaries.map((summary) =>
  createData(
    summary.semana,
    summary.sumaContactos,
    summary.sumaEmail,
    summary.sumaMensajesWhatsapp,
    summary.sumaLlamadasWhatsapp,
    summary.sumaLlamadasTelefonicas,
    summary.metaAlcanzada
  )
);

function descendingComparator(a, b, orderBy) {
  return b[orderBy] - a[orderBy];
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "semana",
    align: "center",
    disablePadding: false,
    label: "Semana",
  },
  {
    id: "contacto",
    align: "center",
    disablePadding: true,
    label: "Contacto",
  },
  {
    id: "email",
    align: "center",
    disablePadding: false,
    label: "E-mail",
  },
  {
    id: "mensajesWhatsapp",
    align: "center",
    disablePadding: false,
    label: "Mensajes Whatsapp",
  },
  {
    id: "llamadasWhatsapp",
    align: "center",
    disablePadding: false,
    label: "Llamadas Whatsapp",
  },
  {
    id: "llamadasTelefonicas",
    align: "center",
    disablePadding: false,
    label: "Llamadas Telefónicas",
  },
  {
    id: "metaAlcanzada",
    align: "center",
    disablePadding: false,
    label: "Meta Alcanzada",
  },
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const OrderStatus = ({ status }) => {
  const iconStyles = {
    fontSize: "1.5rem", // Tamaño del ícono
    color: status ? "#00C853" : "#FF1744", // Color verde si es verdadero, rojo si es falso
    margin: "auto", // Centra el ícono horizontalmente
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {status ? (
        <CheckIcon style={iconStyles} />
      ) : (
        <CloseIcon style={iconStyles} />
      )}
    </div>
  );
};

function AdditionalTable({ rowData }) {
  const additionalRowStyle = {
    
    fontWeight: "bold", // Establece el texto en negrita
    
  };
  return (
    <>
      
      {Object.keys(rowData).map((contacto) => (
        <React.Fragment key={contacto}>
          
          <TableRow>
          <TableCell align="center"></TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              {" "}
              {/* Aplica el estilo de texto */}
              {contacto}
            </TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              {rowData[contacto].email}
            </TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              {rowData[contacto].mensaje_whatsapp}
            </TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              {rowData[contacto].llamadas_whatsapp}
            </TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              {rowData[contacto].llamadas_telefonicas}
            </TableCell>
            <TableCell align="center" style={additionalRowStyle}>
              <OrderStatus status={rowData[contacto].meta_alcanzada} />
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </React.Fragment>
      ))}
      <TableCell align="center"></TableCell>
    </>
  );
}

export default function TablaIndicadoresSemanalesIntentos() {
  const [order] = useState("asc");
  const [orderBy] = useState("semana");
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (row) => {
    if (expandedRow === row) {
      setExpandedRow(null);
    } else {
      setExpandedRow(row);
    }
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => (
                <React.Fragment key={row.semana}>
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    tabIndex={-1}
                    key={row.semana}
                    onClick={() => handleRowClick(row.semana)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell align="center">
                      <Link color="secondary" component={RouterLink} to="">
                        {row.semana}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.contacto}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.mensajesWhatsapp}</TableCell>
                    <TableCell align="center">{row.llamadasWhatsapp}</TableCell>
                    <TableCell align="center">
                      {row.llamadasTelefonicas}
                    </TableCell>
                    <TableCell align="center">
                      <OrderStatus status={row.metaAlcanzada} />
                    </TableCell>
                    <TableCell align="center">
                      {expandedRow === row.semana ? (
                        <ExpandLessIcon color="primary" />
                      ) : (
                        <ExpandMoreIcon color="primary" />
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedRow === row.semana && (
                    <AdditionalTable rowData={data[row.semana]} />
                  )}
                </React.Fragment>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
