import { Chip, SxProps, Theme } from '@mui/material'
import { RecruitmentStatus } from '~/global/app-status'

interface RecruitmentStatusTagProps {
  type: RecruitmentStatus
}

const RecruitmentStatusTag = ({ type }: RecruitmentStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case RecruitmentStatus.PENDING: {
      label = 'Chờ duyệt'
      styles = {
        backgroundColor: '#d4f7ff',
        '& .MuiChip-label': { color: '#5badd0' }
      }
      break
    }
    case RecruitmentStatus.INTERVIEWING: {
      label = 'Đang phỏng vấn'
      styles = {
        backgroundColor: '#ffcf221f',
        '& .MuiChip-label': { color: '#ffcf22' }
      }
      break
    }
    case RecruitmentStatus.SELECTED: {
      label = 'Chấp nhận'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case RecruitmentStatus.REJECTED: {
      label = 'Từ chối'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
    case RecruitmentStatus.EXPIRED: {
      label = 'Quá hạn'
      styles = {
        backgroundColor: '#0000000a',
        '& .MuiChip-label': { color: '#0000007a' }
      }
      break
    }
  }

  return <Chip label={label} sx={styles} />
}

export default RecruitmentStatusTag
