import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import Chart from 'react-apexcharts'

const ClassChart = () => {
  return (
    <Paper>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        paddingX='1.5rem'
        paddingY='1rem'
        borderBottom='1px solid #0000001F'
      >
        <Typography fontSize='1.25rem' fontWeight='500'>
          Số người dùng mỗi tháng
        </Typography>
        <Typography
          variant='caption'
          component={Link}
          color='#000000DE'
          to={protectedRoute.classList.path}
          sx={{ textDecoration: 'none' }}
        >
          Xem tất cả
        </Typography>
      </Box>
      <ChartDisplay data={[30, 20, 10, 5]} />
    </Paper>
  )
}

export default ClassChart

interface ChartDisplayProps {
  data: number[]
}

const ChartDisplay = ({ data }: ChartDisplayProps) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false }
    },
    labels: ['Công khai', 'Đang diễn ra', 'Đã kết thúc', 'Đã hủy'],
    colors: ['#FFCF22', '#20C017', '#F66868', '#707070'],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      labels: {
        colors: '#333333'
      },
      markers: {
        size: 8,
        shape: 'circle'
      },
      itemMargin: {
        horizontal: 12
      },
      offsetY: -8
    }
  }

  return <Chart type='pie' options={chartOptions} series={data} height='337px' />
}
