import { ICustomButtonProps } from '~/global/interfaces/commonInterface'
import CustomButton from './CustomButton'
import { useTheme } from '@mui/material'

const CancelButton = (props: ICustomButtonProps) => {
  const { name, onClick, icon, sx, disable, type } = props
  const theme = useTheme()
  return (
    <>
      <CustomButton
        variant='contained'
        name={name}
        type={type}
        icon={icon}
        sx={{
          textTransform: 'uppercase',
          fontSize: '14px',
          margin: '10px',
          padding: '10px',
          lineHeight: '1.2',
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main
          },
          '&:focus': {
            outline: 'none'
          },
          ...sx
        }}
        onClick={onClick}
        disable={disable}
      />
    </>
  )
}

export default CancelButton
