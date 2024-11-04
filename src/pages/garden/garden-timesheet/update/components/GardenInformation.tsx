import { Box, Divider, Grid, Paper, Typography } from '@mui/material'

interface GardenInformationProps {
  garden: {
    name: string
    address: string
  }
}

const GardenInformation = ({ garden }: GardenInformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginY: '20px', padding: '24px' }}>
      <Box display='flex' alignItems='center' marginBottom='20px'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
          Thông tin nhà vườn
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Grid container mt={1} rowGap={'20px'}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <Typography fontWeight={500} width={'180px'}>
              Tên nhà vườn:
            </Typography>
            {garden.name}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <Typography fontWeight={500} width={'180px'}>
              Địa chỉ:
            </Typography>
            {garden.address}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GardenInformation
