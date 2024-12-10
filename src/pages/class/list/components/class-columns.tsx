import { MRT_ColumnDef } from 'material-react-table'
import ClassStatusTag from '~/components/tag/ClassStatusTag'
import { ClassListItemResponseDto } from '~/data/class.dto'

export const classColumns: MRT_ColumnDef<ClassListItemResponseDto>[] = [
  {
    accessorKey: 'code',
    header: 'Mã lớp học',
    size: 130,
    grow: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'course.code',
    header: 'Mã khóa học',
    size: 140,
    grow: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'title',
    header: 'Tên khóa học'
  },
  {
    accessorKey: 'instructor.name',
    size: 250,
    grow: false,
    header: 'Giảng viên',
    enableColumnFilter: false
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    enableColumnFilter: false,
    size: 150,
    grow: false,
    Cell: ({ row }) => {
      const date = new Date(row.original.startDate)
      return date.toLocaleDateString('vi-VN')
    }
  },
  {
    accessorKey: 'duration',
    size: 130,
    grow: false,
    header: 'Thời lượng',
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.duration} tuần`
    }
  },
  {
    accessorKey: 'learnerQuantity',
    header: 'Số học viên',
    size: 140,
    grow: false,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return `${row.original.learnerQuantity} / ${row.original.learnerLimit}`
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 130,
    grow: false,
    enableColumnFilter: false,
    enableSorting: false,
    Cell: ({ row }) => {
      const type = row.original.status
      return <ClassStatusTag type={type} />
    }
  }
]
