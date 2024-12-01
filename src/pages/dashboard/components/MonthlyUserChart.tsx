import { Box, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { ReportUserByMonthListItemResponseDto } from '~/data/report.dto'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'

const MonthlyUserChart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const { getReportUserDataByMonth } = useReportApi()
  const [chartData, setChartData] = useState<ListResponseDto<ReportUserByMonthListItemResponseDto>>({
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  })
  const [error, setError] = useState<ErrorResponseDto | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: reportData, error: apiError } = await getReportUserDataByMonth(selectedYear)
      if (reportData) {
        setChartData(reportData)
      } else {
        setChartData({
          docs: [],
          totalDocs: 0,
          offset: 0,
          limit: 0,
          totalPages: 0,
          page: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null
        })
      }
      setError(apiError)
    })()
  }, [getReportUserDataByMonth, selectedYear])

  if (error) {
    notifyError(error.message)
  }

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
        <Select
          size='small'
          displayEmpty
          value={selectedYear}
          onChange={(e) => {
            if (typeof e.target.value === 'string') setSelectedYear(Number.parseInt(e.target.value))
            else setSelectedYear(e.target.value)
          }}
        >
          {[{ name: '2024', value: 2024 }].map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <ChartDisplay data={chartData.docs} />
    </Paper>
  )
}

export default MonthlyUserChart

interface ChartDisplayProps {
  data: ReportUserByMonthListItemResponseDto[]
}

const ChartDisplay = ({ data }: ChartDisplayProps) => {
  const chartSeries: ApexCharts.ApexOptions['series'] = useMemo(() => {
    const leanerQuantities: number[] = []
    const instructorQuantities: number[] = []

    const series: ApexCharts.ApexOptions['series'] = [
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
