import { ICustomButtonProps } from '~/global/interfaces/commonInterface'
import CustomButton from './CustomButton'
import { useTheme } from '@mui/material'

const SecondaryButton = ({ color, ...props }: ICustomButtonProps & { color?: string }) => {
  const { name, onClick, icon } = props
  const theme = useTheme()
  return (
    <CustomButton
      variant='outlined'
      name={name}
      type='submit'
      sx={{
        textTransform: 'uppercase',
        fontSize: '14px',
        margin: '10px',
        padding: '10px',
        lineHeight: '1.2',
        color: color || theme.palette.primary.main,
        borderColor: color || theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.primary.main
        },
        '&:focus': {
          outline: 'none'
        }
      }}
      icon={icon}
      onClick={onClick}
    />
  )
}

export default SecondaryButton
