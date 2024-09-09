import { Button } from '@mui/material'
import { ICustomButtonProps } from '~/global/interfaces/commonInterface'

const CustomButton = (props: ICustomButtonProps) => {
  const { name, icon, variant, sx, type, onClick, disable } = props
  return (
    <Button name={name} startIcon={icon} variant={variant} sx={sx} type={type} onClick={onClick} disabled={disable}>
      {name}
    </Button>
  )
}

export default CustomButton
