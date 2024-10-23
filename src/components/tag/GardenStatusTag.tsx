import { Chip, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'
import { GardenStatus } from '~/global/app-status'

interface GardenStatusTagProps {
  type: GardenStatus
}

const GardenStatusTag = ({ type }: GardenStatusTagProps): ReactNode => {
  let label = ''
  let styles: SxProps<Theme> | undefined = undefined

  switch (type) {
    case GardenStatus.ACTIVE: {
      label = 'Hoạt động'
      styles = {
        backgroundColor: '#20c0171f',
        '& .MuiChip-label': { color: '#20c017' }
      }
      break
    }
    case GardenStatus.INACTIVE: {
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

export default GardenStatusTag
