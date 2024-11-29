import { Box, IconButton, Toolbar } from '@mui/material'
import { StyledAppBar } from './AppBar.styled'
import { Menu, Notifications } from '@mui/icons-material'
import PopupState, { bindTrigger } from 'material-ui-popup-state'
import NotificationDialog from './NotificationDialog'

interface AppBarProps {
  open: boolean
  drawerwidth: number
  handleDrawer: () => void
}

const AppBar = ({ open, drawerwidth, handleDrawer }: AppBarProps) => {
  return (
    <StyledAppBar
      position='fixed'
      elevation={0}
      open={open}
      drawerwidth={drawerwidth}
      sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #0000001e' }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawer}
          edge='start'
          sx={{
            marginRight: 5,
            color: '#2EC4B6'
          }}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <PopupState variant='popover' popupId='demo-popup-popover'>
            {(popupState) => (
              <>
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                  {...bindTrigger(popupState)}
                >
                  <Notifications sx={{ color: '#2EC4B6' }} />
                </IconButton>
                <NotificationDialog popupState={popupState} />
              </>
            )}
          </PopupState>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default AppBar
