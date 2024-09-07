import { lazy, Suspense, useState } from 'react'
import { DrawerHeader, Logo, LogoWrapper, StyledDrawer } from './Sidebar.styled'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import OptionList from './OptionList'
import { Logout } from '@mui/icons-material'
import Loading from '../loading/Loading'

const LogoutConfirmation = lazy(() => import('./LogoutConfirmation'))

interface SidebarProps {
  open: boolean
  drawerWidth: number
}

const Sidebar = ({ open, drawerWidth }: SidebarProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <StyledDrawer
      variant='permanent'
      open={open}
      drawerWidth={drawerWidth}
      PaperProps={{ sx: { backgroundColor: '#F7F7FA' } }}
    >
      <DrawerHeader to='/home'>
        <LogoWrapper>
          <Logo src='src\assets\logo.jpg' alt='logo' />
          <Typography variant='h6'>Orchidify</Typography>
        </LogoWrapper>
      </DrawerHeader>
      <Divider />
      <OptionList open={open} />
      <List>
        <ListItem
          disablePadding
          sx={{
            display: 'block'
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            onClick={handleOpenDialog}
          >
            <ListItemText
              primary='Đăng xuất'
              primaryTypographyProps={{ fontWeight: 500, color: '#F66868' }}
              sx={{ opacity: open ? 1 : 0 }}
            />
            <ListItemIcon
              sx={{
                minWidth: 24,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <Logout sx={{ color: '#F66868' }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Suspense fallback={<Loading />}>
        <LogoutConfirmation open={openDialog} handleClose={handleCloseDialog} />
      </Suspense>
    </StyledDrawer>
  )
}

export default Sidebar
