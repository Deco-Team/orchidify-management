import { Grid, Theme } from '@mui/material'
import { ReactNode } from 'react'
import { Label } from './Field.styled'

export interface FieldProps {
  label: string
  content: ReactNode
  theme: Theme
}

const Field: React.FC<FieldProps> = ({ label, content, theme }) => (
  <Grid container spacing={3}>
    <Grid item xs={2}>
      <Label theme={theme}>{label}</Label>
    </Grid>
    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
      {content}
    </Grid>
  </Grid>
)

export default Field
