import Typography from '@mui/material/Typography'
import { MRT_ColumnDef } from 'material-react-table'
import TransactionStatusTag from '~/components/tag/TransactionStatusTag'
import { TransactionListItemResponseDto } from '~/data/transaction.dto'
import { TransactionStatus } from '~/global/app-status'
import { PaymentType, UserRole } from '~/global/constants'
import { formatCurrency } from '~/utils/format'

export const transactionColumns: MRT_ColumnDef<TransactionListItemResponseDto>[] = [
  {
    accessorKey: 'type',
    header: 'Loại giao dịch',
    size: 150,
    grow: false,
    enableSorting: false,
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Mua khóa học', value: PaymentType.PAYMENT },
      { label: 'Rút tiền', value: PaymentType.PAYOUT }
    ],
    Cell: ({ row }) => {
      return row.original.type === PaymentType.PAYMENT
        ? 'Mua khóa học'
        : row.original.type === PaymentType.PAYOUT
          ? 'Rút tiền'
          : 'Khác'
    }
  },
  {
    accessorKey: 'debitAccount.user.name',
    header: 'Tài khoản nguồn',
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return row.original.debitAccount.userRole === UserRole.SYSTEM ? 'Hệ thống' : row.original.debitAccount.user.name
    }
  },
  {
    accessorKey: 'creditAccount.user.name',
    header: 'Tài khoản nhận',
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row }) => {
      return row.original.creditAccount.userRole === UserRole.SYSTEM ? 'Hệ thống' : row.original.creditAccount.user.name
    }
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    muiTableHeadCellProps: {
      align: 'right'
    },
    muiTableBodyCellProps: {
      align: 'right'
    },
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const price = cell.getValue() as number
      return formatCurrency(price)
    }
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
    enableSorting: false,
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Thành công', value: TransactionStatus.CAPTURED },
      { label: 'Thất bại', value: TransactionStatus.ERROR },
      { label: 'Hoàn tiền', value: TransactionStatus.REFUNDED }
    ],
    Cell: ({ row }) => {
      const type = row.original.status
      return <TransactionStatusTag type={type} />
    }
  }
]
