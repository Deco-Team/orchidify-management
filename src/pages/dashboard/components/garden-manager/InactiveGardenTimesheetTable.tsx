import Table from '~/components/table/Table'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import useGardenTimesheetApi from '~/hooks/api/useGardenTimesheetApi'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { GardenTimesheetItemResponseDto } from '~/data/gardenTimesheet.dto'

interface InactiveGardenTimesheetTableProps {
  gardenId: string | null
}

const InactiveGardenTimesheetTable = ({ gardenId }: InactiveGardenTimesheetTableProps) => {
  const { getInactiveGardenTimesheet } = useGardenTimesheetApi()
  const [data, setData] = useState<GardenTimesheetItemResponseDto[]>([])

  useEffect(() => {
    ;(async () => {
      if (!gardenId) return
      const { data, error } = await getInactiveGardenTimesheet(gardenId, dayjs().format('YYYY-MM-DD'))
      if (data) {
        setData(data)
      }
      if (error) {
        console.error(error)
      }
    })()
  }, [gardenId, getInactiveGardenTimesheet])

  return (
    <Table
      title='Danh sách ngày nghỉ'
      tableOptions={{
        columns: gardenTimesheetColumns,
        data: data || [],
        rowCount: data.length,
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
            maxHeight: '391px'
          }
        }
      }}
    />
  )
}
export default InactiveGardenTimesheetTable

const gardenTimesheetColumns: MRT_ColumnDef<GardenTimesheetItemResponseDto>[] = [
  {
    accessorKey: 'start',
    header: 'Ngày nghỉ',
    grow: true,
    Cell: ({ cell }) => {
      const value = cell.getValue() as string
      return dayjs(value).format('DD/MM/YYYY')
    }
  }
]
