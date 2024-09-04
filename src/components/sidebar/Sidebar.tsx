import { useNavigate } from 'react-router-dom'
import { Logo, LogoWrapper, SidebarWrapper, Wrapper } from './Sidebar.styled'
import { Typography } from '@mui/material'
import OptionList from './OptionList'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <SidebarWrapper>
        <LogoWrapper>
          <Logo src='src\assets\logo.jpg' alt='logo' onClick={() => navigate('/dashboard')} />
          <Typography sx={{ fontSize: '1.5rem' }}>Orchidify</Typography>
        </LogoWrapper>
        <OptionList />
      </SidebarWrapper>
    </Wrapper>
  )
}

export default Sidebar
