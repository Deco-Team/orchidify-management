import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ec4b6',
      contrastText: '#ffffff',
      light: '#bfffefc6'
    },
    secondary: {
      main: '#5b72ee'
    },
    info: {
      main: '#aeaeb2',
      light: '#e0e0e0'
    },
    warning: {
      main: '#f88C3D'
    },
    error: {
      main: '#f66868',
      contrastText: '#ffffff',
      light: '#fbd8db'
    },
    success: {
      main: '#1a9882',
      contrastText: '#ffffff',
      light: '#d3f4ef'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        sizeLarge: {
          height: '50px'
        },
        sizeMedium: {
          height: '36px'
        }
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      color: '#ffffff'
    }
  }
})

interface MuiThemeProps {
  children: ReactNode
}

export default function MuiTheme({ children }: MuiThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
