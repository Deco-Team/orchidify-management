import { Chip, SxProps, Theme } from '@mui/material'
import { TransactionStatus } from '~/global/app-status'

interface TransactionStatusTagProps {
  type: TransactionStatus
}

const TransactionStatusTag = ({ type }: TransactionStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case TransactionStatus.CAPTURED: {
      label = 'Thành công'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case TransactionStatus.ERROR: {
      label = 'Thất bại'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case TransactionStatus.REFUNDED: {
      label = 'Hoàn tiền'
      styles = {
        backgroundColor: '#ffcf221f',
        '& .MuiChip-label': { color: '#ffcf22' }
      }
      break
    }
    /*     case TransactionStatus.DRAFT: {
      label = 'Nháp'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case TransactionStatus.DELETED: {
      label = 'Đã xóa'
      styles = {
        backgroundColor: 'transparent',
        '& .MuiChip-label': { color: '#0000007a', textDecoration: 'line-through' }
      }
      break
    } */
  }

  return <Chip label={label} sx={styles} />
}

export default TransactionStatusTag
