import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { CourseListItemResponseDto } from '~/data/course.dto'
import { CourseLevel } from '~/global/constants'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

export const courseColumns: MRT_ColumnDef<CourseListItemResponseDto>[] = [
  {
    accessorKey: 'code',
    header: 'Mã khóa học',
    size: 50
  },
  {
    accessorKey: 'title',
    header: 'Khóa học',
    size: 200
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    size: 120,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    },
    enableColumnFilter: false
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    size: 120,
    Cell: ({ cell }) => {
      const level = cell.getValue() as CourseLevel

      return (
        <Typography
          variant='subtitle2'
          color={
            level === CourseLevel.BASIC
              ? '#20c017'
              : level === CourseLevel.INTERMEDIATE
                ? '#ffcf22'
                : level === CourseLevel.ADVANCED
                  ? '#f66868'
                  : undefined
          }
        >
          {formatCourseLevel(level)}
        </Typography>
      )
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Cơ bản', value: CourseLevel.BASIC },
      { label: 'Trung bình', value: CourseLevel.INTERMEDIATE },
      { label: 'Nâng cao', value: CourseLevel.ADVANCED }
    ]
  },
  {
    accessorKey: 'type',
    header: 'Thể loại',
    size: 180,
    Cell: ({ cell }) => {
      return (cell.getValue() as []).join(', ')
    }
  },
  {
    accessorKey: 'learnerLimit',
    header: 'Giới hạn học viên',
    size: 120,
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false
  }
]
