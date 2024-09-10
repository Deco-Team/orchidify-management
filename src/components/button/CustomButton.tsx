import { Button, SxProps } from '@mui/material'

interface ICustomButtonProps {
  variant: 'contained' | 'outlined'
  name: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  sx?: SxProps
  type: 'button' | 'submit' | 'reset'
  disable?: boolean
}

const CustomButton = (props: ICustomButtonProps) => {
  const { name, icon, variant, sx, type, onClick, disable } = props
  return (
    <Button name={name} startIcon={icon} variant={variant} sx={sx} type={type} onClick={onClick} disabled={disable}>
      {name}
    </Button>
  )
}

export default CustomButton
