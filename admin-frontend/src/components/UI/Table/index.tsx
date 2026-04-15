import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
const DynamicTable = ({ data, columns, pagination, setPagination }: any) => {
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [5, 10, 20, 30, 50, 100, 200],
      shape: 'rounded',
      variant: 'outlined',
    },
  });
  return <MaterialReactTable table={table} />;
};
export default DynamicTable;
