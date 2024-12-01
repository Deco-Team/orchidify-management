import Table from '~/components/table/Table'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { Garden } from '~/data/garden.dto'

interface GardenListTableProps {
  gardenData: Garden[]
}

const GardenListTable = ({ gardenData }: GardenListTableProps) => {
  const navigate = useNavigate()

  return (
    <Table
      title='Danh sách nhà vườn'
      tableOptions={{
        columns: gardenColumns,
        data: gardenData || [],
        rowCount: gardenData.length,
        renderEmptyRowsFallback: () => (
          <Typography
            variant='body1'
            sx={{ color: 'rgba(0, 0, 0, 0.6)', fontStyle: 'italic', py: '2rem', textAlign: 'center', width: '100%' }}
          >
            Không có dữ liệu
          </Typography>
        ),
        enableSorting: false,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        enableStickyFooter: false,
        enablePagination: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableTableHead: false,
        muiTablePaperProps: {
          sx: {
            boxShadow: 'none'
          }
        },
        muiTableContainerProps: {
          sx: {
            maxHeight: '265px'
          }
        },
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.gardenDetail.path.replace(':id', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default GardenListTable

const gardenColumns: MRT_ColumnDef<Garden>[] = [
  {
    accessorKey: 'name',
    header: 'Mã lớp học',
    grow: true
  }
]
