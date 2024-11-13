import { MRT_ColumnDef } from 'material-react-table'
import { CourseComboListItemResponseDto } from '~/data/courseCombo.dto'

export const CourseComboColumns: MRT_ColumnDef<CourseComboListItemResponseDto>[] = [
  {
    accessorKey: 'title',
    header: 'Combo khóa học'
  },
  {
    accessorKey: 'instructor.name',
    size: 250,
    grow: false,
    header: 'Giảng viên',
    enableColumnFilter: false
  },
  {
    accessorKey: 'discount',
    header: 'Giảm giá',
    size: 150,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      return `${cell.getValue()}%`
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'childCourseIds.length',
    header: 'Số khóa trong combo',
    size: 180,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    enableSorting: false
  }
]
