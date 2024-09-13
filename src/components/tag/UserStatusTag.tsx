import { Chip, SxProps, Theme } from '@mui/material'
import { UserStatus } from '~/global/app-status'

interface UserStatusTagProps {
  type: UserStatus
}

const UserStatusTag = ({ type }: UserStatusTagProps) => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case UserStatus.ACTIVE: {
      label = 'Hoạt động'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case UserStatus.INACTIVE: {
      label = 'Vô hiệu hóa'
      styles = {
        backgroundColor: '#f668681f',
        '& .MuiChip-label': { color: '#f66868' }
      }
      break
    }
  }

  return <Chip label={label} sx={styles} />
}

export default UserStatusTag
