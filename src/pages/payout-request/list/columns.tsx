import { Check, Close } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import { MRT_ColumnDef } from 'material-react-table'
import RequestStatusTag from '~/components/tag/RequestStatusTag'
import { PayoutRequestListItemDto } from '~/data/payoutRequest.dto'
import { RequestStatus } from '~/global/app-status'
import { formatCurrency } from '~/utils/format'

export const PayoutRequestColumns: MRT_ColumnDef<PayoutRequestListItemDto>[] = [
  {
    accessorKey: 'createdBy.name',
    header: 'Tên giảng viên',
    enableColumnFilter: false
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    size: 150,
    grow: false,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    }
  },
  {
    accessorKey: 'description',
    header: 'Mô tả yêu cầu',
    size: 250,
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const description = cell.getValue() as string
      return (
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: 400,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 150,
    muiTableBodyCellProps: {
      style: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    enableColumnFilter: false,
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
    muiTableBodyCellProps: {
      style: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    enableColumnFilter: false,
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
    ]
  },
  {
    accessorKey: 'hasMadePayout',
    header: 'Đã thực hiện',
    size: 120,
    grow: false,
    muiTableHeadCellProps: { align: 'center' },
    muiTableBodyCellProps: { align: 'center' },
    enableSorting: false,
    filterVariant: 'select',
    filterSelectOptions: [
      { label: 'Đã thực hiện', value: true },
      { label: 'Chưa chuyển', value: false }
    ],
    Cell: ({ row }) => {
      return row.original.status === RequestStatus.APPROVED ? (
        row.original.hasMadePayout ? (
          <Check sx={{ color: '#34B233' }} />
        ) : (
          <Close sx={{ color: '#FF605C' }} />
        )
      ) : null
    }
  },
  {
    accessorKey: 'rejectReason',
    header: 'Lý do từ chối',
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const reason = cell.getValue() as string
      return (
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: 400,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '130px',
            overflow: 'hidden'
          }}
        >
          {reason}
        </Typography>
      )
    }
  }
]
