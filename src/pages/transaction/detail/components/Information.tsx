import { Box, Divider, Paper, Typography } from '@mui/material'
import TransactionStatusTag from '~/components/tag/TransactionStatusTag'
import { TransactionDetailResponseDto } from '~/data/transaction.dto'
import { TransactionStatus } from '~/global/app-status'
import { PaymentType, UserRole } from '~/global/constants'
import { formatCurrency } from '~/utils/format'

interface FieldProps {
  label: string
  content?: string
  transactionType?: PaymentType
  statusTag?: TransactionStatus
}

const Field: React.FC<FieldProps> = ({ label, content, transactionType, statusTag }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {transactionType && (
      <Typography variant='subtitle1' fontWeight={400}>
        {transactionType === PaymentType.PAYMENT
          ? 'Mua khóa học'
          : transactionType === PaymentType.PAYOUT
            ? 'Rút tiền'
            : 'Khác'}
      </Typography>
    )}

    {statusTag && <TransactionStatusTag type={statusTag} />}
  </Box>
)

interface InformationProps {
  transaction: TransactionDetailResponseDto
}

const Information = ({ transaction }: InformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin giao dịch
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
        <Field
          label='Mã giao dịch'
          content={
            transaction.type === PaymentType.PAYMENT
              ? transaction.payment.code || 'Không có dữ liệu'
              : transaction.type === PaymentType.PAYOUT
                ? transaction.payout.code || 'Không có dữ liệu'
                : 'Không có dữ liệu'
          }
        />
        <Field label='Loại giao dịch' transactionType={transaction.type} />
        <Field
          label='Tài khoản nguồn'
          content={
            transaction.debitAccount.userRole === UserRole.SYSTEM ? 'Hệ thống' : transaction.debitAccount.user.name
          }
        />
        <Field
          label='Tài khoản nhận'
          content={
            transaction.creditAccount.userRole === UserRole.SYSTEM ? 'Hệ thống' : transaction.creditAccount.user.name
          }
        />
        <Field label='Số tiền' content={formatCurrency(transaction.amount)} />
        <Field label='Nội dung' content={transaction.description} />
        <Field label='Thời gian tạo' content={new Date(transaction.createdAt).toLocaleString('vi-VN')} />
        <Field label='Cập nhật cuối' content={new Date(transaction.updatedAt).toLocaleString('vi-VN')} />
        <Field label='Trạng thái' statusTag={transaction.status} />
      </Box>
    </Paper>
  )
}

export default Information
