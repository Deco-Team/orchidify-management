import { Box, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

const MonthlyUserChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const [chartData, setChartData] = useState<{ learner: { quantity: number }; instructor: { quantity: number } }[]>([])

  useEffect(() => {
    ;(async () => {
      // Fetch data from API
      setChartData([
        { learner: { quantity: 43 }, instructor: { quantity: 11 } },
        { learner: { quantity: 26 }, instructor: { quantity: 47 } },
        { learner: { quantity: 44 }, instructor: { quantity: 12 } },
        { learner: { quantity: 31 }, instructor: { quantity: 10 } },
        { learner: { quantity: 46 }, instructor: { quantity: 40 } },
        { learner: { quantity: 7 }, instructor: { quantity: 40 } },
        { learner: { quantity: 2 }, instructor: { quantity: 48 } },
        { learner: { quantity: 25 }, instructor: { quantity: 18 } },
        { learner: { quantity: 8 }, instructor: { quantity: 18 } },
        { learner: { quantity: 12 }, instructor: { quantity: 18 } },
        { learner: { quantity: 32 }, instructor: { quantity: 33 } },
        { learner: { quantity: 20 }, instructor: { quantity: 10 } }
      ])
    })()
  }, [selectedYear])

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
          Lớp học
        </Typography>
        <Select size='small' displayEmpty value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <MenuItem value=''>Chọn năm</MenuItem>
          {[{ name: '2024', value: '2024' }].map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <ChartDisplay data={chartData} />
    </Paper>
  )
}

export default MonthlyUserChart

interface ChartDisplayProps {
  data: { learner: { quantity: number }; instructor: { quantity: number } }[]
}

const ChartDisplay = ({ data }: ChartDisplayProps) => {
  const chartSeries: ApexAxisChartSeries = useMemo(() => {
    const leanerQuantities: number[] = []
    const instructorQuantities: number[] = []

    const series: ApexAxisChartSeries = [
      { name: 'Học viên', color: '#2EC4B6', data: leanerQuantities },
      { name: 'Giảng viên', color: '#F56767', data: instructorQuantities }
    ]

    data.forEach((month) => {
      leanerQuantities.push(month.learner.quantity)
      instructorQuantities.push(month.instructor.quantity)
    })

    return series
  }, [data])

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      stacked: true,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#333333'],
        fontSize: '0.75rem',
        fontWeight: 400
      },
      offsetY: -5
    },
    grid: {
      borderColor: '#CCCCCC',
      position: 'back',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      labels: {
        style: {
          colors: '#333333',
          fontSize: '0.75rem',
          fontWeight: 400
        }
      }
    },
    yaxis: { stepSize: 25 },
    legend: {
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
      }
    }
  }

  return <Chart type='bar' options={chartOptions} series={chartSeries} height='312px' />
}
