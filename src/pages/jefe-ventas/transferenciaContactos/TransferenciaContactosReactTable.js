import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

import { blue, cyan, deepPurple, yellow } from '@mui/material/colors';

// material-ui
import { Button, Chip, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

// third-party
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';

import { ThemeDirection } from 'config';
import SyntaxHighlight from 'utils/SyntaxHighlight';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, EmptyTable, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
// import makeData from 'data/react-table';
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';
import useContacto from 'hooks/contacto/useContacto';

import { useDispatch, useSelector } from 'store';
import { setContactos } from 'store/reducers/transferenciaContactosSlice';
import useVendedoresByJefeVentaEmpeladoId from 'hooks/jefeVenta/useVendedoresByJefeVentaEmpeladoId';
import SelectVendedor from './modal/SelectVendedor';
import useCurrentUser from 'hooks/useCurrentUser';

// ==============================|| REACT TABLE ||============================== //

const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

function ReactTable({ columns, data }) {
  // const vendedores = useVendedoresByJefeVentaEmpeladoId();
  

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({
    filters: [
      {
        id: 'origen_contacto',
        value: ''
      },
      {
        id: 'EstadoContacto.estado_contacto',
        value: ''
      }
    ],
    pageIndex: 0,
    pageSize: 10,
    // selectedRowIds: {
    //   0: false,
    //   5: false,
    //   7: false
    // }
  }), []);

  //Row Selection
  const theme = useTheme();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    state,
    gotoPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize },
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState,
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: 'row-selection-chk',
          accessor: 'Selection',
          Header: SelectionHeader,
          Cell: SelectionCell
        },
        ...columns
      ]);
    }
  );

  // const sortingRow = rows.slice(0, 10);
  // const page = rows;

  function handleTransferirContactos() {
    console.log('transferir');
    console.log('selectedFlatRows', selectedFlatRows);
    // console.log('vendedores table', vendedores);  

    // const contactos = selectedFlatRows.map((row) => {
    //   // console.log('contacto id', row.original.id, 'empelado_id', row.original.empleado_id);
    //   const contactoId = row.original.id;
    //   const vendedorEmpleadoId = row.original.empleado_id;

    //   return {
    //     contactoId,
    //     vendedorEmpleadoId
    //   }

    // })
    // console.log('contactos', contactos);

    // const vendedoress = vendedores.map((vendedor) => {
    //   const nombre = vendedor.Empleado.nombres + ' ' + vendedor.Empleado.apellidos;
    //   const vendedorId = vendedor.id;
    //   const empleadoId = vendedor.empleado_id;

    //   return {
    //     nombre,
    //     vendedorId,
    //     empleadoId
    //   }
    // })

    // console.log('vendedoress', vendedoress);
  }

  const contactoss = selectedFlatRows.map((row) => {
    // console.log('contacto id', row.original.id, 'empelado_id', row.original.empleado_id);
    const contactoId = row.original.id;
    const vendedorEmpleadoId = row.original.empleado_id;

    return {
      contactoId,
      vendedorEmpleadoId
    }

  })
  // console.log('contactoss', contactoss);

  // const vendedoress = vendedores.map((vendedor) => {
  //   const nombre = vendedor.Empleado.nombres + ' ' + vendedor.Empleado.apellidos;
  //   const vendedorId = vendedor.id;
  //   const empleadoId = vendedor.empleado_id;

  //   return {
  //     nombre,
  //     vendedorId,
  //     empleadoId
  //   }
  // })
  // console.log('vendedoress', vendedoress);

  return (
    <>
      <MainCard
        title="Transferencia de Contactos"
        content={false}
        secondary={
          <CSVExport
            data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data}
            filename={'row-selection-table.csv'}
            
          />
        }
        
      >
        <ScrollX>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          <Stack
            spacing={3}
            sx={{
              ...(theme.direction === ThemeDirection.RTL && {
                '.MuiTable-root': { width: { xs: '930px', sm: 'inherit' } },
                pre: { width: { xs: '930px', sm: 'inherit' }, overflowX: 'unset' }
              })
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ padding: 2 }}
            >
              <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
              {/* <CSVExport data={rows.map((d) => d.original)} filename={'filtering-table.csv'} /> */}

              <SelectVendedor
                handleAction={handleTransferirContactos}
                contactos={contactoss}
              />
                
            </Stack>

            <Table {...getTableProps()}>
              <TableHead sx={{ borderTopWidth: 2 }}>
                {headerGroups.map((headerGroup, i) => (
                  <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                        {column.render('Header')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {headerGroups.map((group, i) => (
                  <TableRow key={i} {...group.getHeaderGroupProps()}>
                    {group.headers.map((column, index) => (
                      <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                        
                        {column.canFilter && index != 0 ? column.render('Filter') : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {/* {sortingRow.length > 0 ? (
                  sortingRow.map((row, i) => {
                    prepareRow(row);
                    return (
                      <TableRow
                        key={i}
                        {...row.getRowProps()}
                        onClick={() => {
                          row.toggleRowSelected();
                        }}
                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                      >
                        {row.cells.map((cell, index) => (
                          <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                            {cell.render('Cell')}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyTable msg="No Data" colSpan={7} />
                )} */}
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      key={i}
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell, index) => (
                        <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{ p: 2, pb: 0 }} colSpan={8}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Data selected */}
            {/* <SyntaxHighlight>
              {JSON.stringify(
                {
                  selectedRowIndices: selectedRowIds,
                  'selectedFlatRows[].original': selectedFlatRows.map((d) => d.original)
                },
                null,
                2
              )}
            </SyntaxHighlight> */}

          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - FILTERING ||============================== //

// Progress
const CellProgress = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

CellProgress.propTypes = {
  value: PropTypes.number
};

// Status
const StatusCell = ({ value }) => {
  // console.log('value', value);
  switch (value) {
    case 'BCS':
      return <Chip color="error" label="BCS" size="small" variant="light" />;
    case 'Cita Nueva Concretada':
      return <Chip color="success" label="Cita Nueva Concretada" size="small" variant="light" />;
    case 'Cita Seguimiento':
      return <Chip sx={{ color: yellow[900]}} label="Cita Seguimiento" size="small" variant="light" />;
    case 'Cita Cierre':
      return <Chip color="secondary" label="Cita Cierre" size="small" variant="light" />;
    case 'Cita Casual':
      return <Chip sx={{ color: cyan[600]}} label="Cita Casual" size="small" variant="light" />;
    case 'Gestion de Contactos':
      return <Chip sx={{ color: deepPurple[600]}} label="Gestion de Contactos" size="small" variant="light" />;
    // default:
    //   return <Chip color="info" label="" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const FilteringTable = () => {
  // const data = useMemo(() => makeData(2000), []);
  // const data = []
  // const dispatch = useDispatch();
  const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();

  // const { contactos: data } = useContacto();
  const { getContactosFromDB } = useContacto();
  // useContacto();
  useEffect(() => {
    getContactosFromDB(cuentaInfo?.empleado_id);
    // console.log('contactosss', contactos);
    // console.log('contactosss', data);
    // const [contactos, setContactos] = useState([]);


  }, [cuentaInfo])

  //contactos
  const data = useSelector((state) => state.transferenciaContactos.contactos);
  // useEffect(() => {

  // }, [data])

  // console.log('contactos rr', contactos);

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombres'
      },
      {
        Header: 'Apellido',
        accessor: 'apellidos',
        filter: 'fuzzyText'
      },
      {
        Header: 'Origen',
        accessor: 'origen_contacto',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: StatusCell
      },
      {
        Header: 'Estado',
        accessor: 'EstadoContacto.estado_contacto',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Nombre del Vendedor',
        accessor: 'Empleado.nombres'
      },
      {
        Header: 'Apellido del Vendedor',
        accessor: 'Empleado.apellidos'
      },
      // {
      //   Header: 'Age',
      //   accessor: 'age',
      //   className: 'cell-right',
      //   Filter: SliderColumnFilter,
      //   filter: 'equals'
      // },
      // {
      //   Header: 'Visits',
      //   accessor: 'visits',
      //   className: 'cell-right',
      //   Filter: NumberRangeColumnFilter,
      //   filter: 'between'
      // },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   Filter: SelectColumnFilter,
      //   filter: 'includes',
      //   Cell: StatusCell
      // },
      // {
      //   Header: 'Profile Progress',
      //   accessor: 'progress',
      //   Filter: SliderColumnFilter,
      //   filter: filterGreaterThan,
      //   Cell: CellProgress
      // }
    ],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default FilteringTable;
