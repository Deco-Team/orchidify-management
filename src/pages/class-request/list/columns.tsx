import Typography from '@mui/material/Typography'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatusTag'
import { ClassRequestListItemResponseDto } from '~/data/classRequest.dto'
import { RequestStatus } from '~/global/app-status'
import { RequestType } from '~/global/constants'
import { formatRequestType } from '~/utils/format'

export const ClassRequestColumns: MRT_ColumnDef<ClassRequestListItemResponseDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại yêu cầu',
    size: 140,
    grow: false,
    Cell: ({ row }) => {
      const type = row.original.type
      return formatRequestType(type)
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Mở lớp học', value: RequestType.PUBLISH_CLASS },
      { label: 'Hủy lớp học', value: RequestType.CANCEL_CLASS }
    ]
  },
  {
    accessorKey: 'metadata.code',
    header: 'Mã lớp học',
    size: 150,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? 'Không có dữ liệu' : original.metadata.code
    },
    enableColumnFilter: false
  },
  {
    accessorFn: (row) => row.metadata.course,
    header: 'Mã khóa học',
    size: 140,
    grow: false,
    Cell: ({ row: { original } }) => {
      return original.type === RequestType.PUBLISH_CLASS ? original.metadata.code : original.metadata.course!.code
    },
    enableColumnFilter: false
  },
  {
    accessorFn: (row) => row.metadata.title,
    header: 'Tên khóa học',
    enableColumnFilter: false
  },
  {
    accessorKey: 'createdBy.name',
    header: 'Giảng viên',
    size: 250,
    grow: false,
    enableColumnFilter: false
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 150,
    grow: false,
    enableColumnFilter: false,
    muiTableBodyCellProps: {
      style: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 150,
    grow: false,
    enableColumnFilter: false,
    muiTableBodyCellProps: {
      style: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    Cell: ({ cell }) => {
      const date = cell.getValue() as string
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 130,
    grow: false,
    Cell: ({ row }) => {
      const type = row.original.status
      return <RequestStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Chờ duyệt', value: RequestStatus.PENDING },
      { label: 'Chấp nhận', value: RequestStatus.APPROVED },
      { label: 'Từ chối', value: RequestStatus.REJECTED },
      { label: 'Hủy', value: RequestStatus.CANCELED },
      { label: 'Hết hạn', value: RequestStatus.EXPIRED }
    ],
    enableSorting: false
  }
]
