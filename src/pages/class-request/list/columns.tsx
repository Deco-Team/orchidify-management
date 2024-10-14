import Typography from '@mui/material/Typography'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatusTag'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { RequestStatus } from '~/global/app-status'
import { formatRequestType } from '~/utils/format'

export const ClassRequestColumns: MRT_ColumnDef<ClassRequestDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại yêu cầu',
    size: 150,
    Cell: ({ row }) => {
      const type = row.original.type
      return formatRequestType(type)
    }
  },
  {
    accessorFn: (row) => row.metadata.code,
    header: 'Mã khóa học',
    size: 150
  },
  {
    accessorFn: (row) => row.metadata.title,
    header: 'Tên khóa học',
    size: 300
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 150,
    Cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
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
    Cell: ({ row }) => {
      const date = new Date(row.original.updatedAt)
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
    size: 150,
    Cell: ({ row }) => {
      const type = row.original.status
      return <RequestStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Chờ duyệt', value: RequestStatus.PENDING },
      { label: 'Chấp nhận', value: RequestStatus.APPROVED },
      { label: 'Từ chối', value: RequestStatus.REJECTED },
      { label: 'Hủy', value: RequestStatus.CANCELLED },
      { label: 'Hết hạn', value: RequestStatus.EXPIRED }
    ]
  }
]
