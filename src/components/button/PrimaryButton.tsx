import { ICustomButtonProps } from '~/global/interfaces/commonInterface'
import CustomButton from './CustomButton'
import { useTheme } from '@mui/material'

const PrimaryButton = ({ color, ...props }: ICustomButtonProps & { color?: string }) => {
  const { name, onClick, icon, disable } = props
  const theme = useTheme()
  return (
    <>
      <CustomButton
        variant='contained'
        name={name}
        type='submit'
        icon={icon}
        sx={{
          textTransform: 'uppercase',
          fontSize: '14px',
          margin: '10px',
          padding: '10px',
          lineHeight: '1.2',
          color: theme.palette.primary.contrastText,
          backgroundColor: color || theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
            color: color || theme.palette.primary.main,
            border: '1px solid',
            borderColor: color || theme.palette.primary.main
          },
          '&:focus': {
            outline: 'none'
          }
        }}
        onClick={onClick}
        disable={disable}
      />
    </>
  )
}

export default PrimaryButton
