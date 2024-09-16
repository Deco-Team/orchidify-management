import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

declare module '@mui/material/styles' {
  interface Theme {
    label: {
      secondary: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    label?: {
      secondary?: string
    }
  }
}

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
      light: '#e0e0e0',
      dark: '#666666'
    },
    warning: {
      main: '#ff9242',
      contrastText: '#ffffff'
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
  label: {
    secondary: '#3C3C4399'
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          padding: '8px 22px'
        },
        sizeLarge: {
          height: '50px'
        },
        sizeMedium: {
          height: '40px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
          padding: '2px 8px',
          borderRadius: '4px',
          '& .MuiChip-label': {
            fontSize: '14px',
            fontWeight: 500,
            padding: 0
          }
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
