import { SxProps } from '@mui/material'

export interface ICustomButtonProps {
  variant: 'contained' | 'outlined'
  name: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  sx?: SxProps
  type: 'button' | 'submit' | 'reset'
  disable?: boolean
}

export interface DialogProps {
  open: boolean
  handleClose: () => void
}
