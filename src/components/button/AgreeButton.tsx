import { ICustomButtonProps } from '~/global/interfaces/commonInterface'
import CustomButton from './CustomButton'
import { useTheme } from '@mui/material'

const AgreeButton = (props: ICustomButtonProps) => {
  const { name, onClick, icon, sx, disable } = props
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
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.main,
          '&:hover': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.main
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

export default AgreeButton
