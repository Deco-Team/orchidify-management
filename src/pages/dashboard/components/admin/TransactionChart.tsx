import { Paper, Box, Typography, MenuItem, Select } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { ReportTransactionByDateListItemResponseDto } from '~/data/reportAdmin.dto'
import { useReportAdminApi } from '~/hooks/api/useReportAdminApi'
import { notifyError } from '~/utils/toastify'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import { formatCurrency } from '~/utils/format'

const TransactionChart = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'))
  const { getReportTransactionDataByDate } = useReportAdminApi()
  const [chartData, setChartData] = useState<ListResponseDto<ReportTransactionByDateListItemResponseDto>>({
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
      const { data: reportData, error: apiError } = await getReportTransactionDataByDate(selectedDate)
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
  }, [getReportTransactionDataByDate, selectedDate])

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
          Giao dịch
        </Typography>
        <Select size='small' displayEmpty value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <MenuItem value=''>Chọn ngày</MenuItem>
          {[
            {
              name: dayjs(new Date()).add(-56, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-56, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-49, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-49, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-42, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-42, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-35, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-35, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-28, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-28, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-21, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-21, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-14, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-14, 'day').format('YYYY-MM-DD')
            },
            {
              name: dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD'),
              value: dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')
            },
            { name: dayjs(new Date()).format('YYYY-MM-DD'), value: dayjs(new Date()).format('YYYY-MM-DD') }
          ].map((item) => (
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

export default TransactionChart

interface ChartDisplayProps {
  data: ReportTransactionByDateListItemResponseDto[]
}

const ChartDisplay = ({ data }: ChartDisplayProps) => {
  const chartSeries: ApexCharts.ApexOptions['series'] = useMemo(() => {
    const payoutAmount: number[] = []

    const series: ApexCharts.ApexOptions['series'] = [{ name: 'Ghi giảm', color: '#F56767', data: payoutAmount }]

    data.forEach((date) => {
      payoutAmount.push(date.payoutAmount)
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
      formatter: (value: number) => {
        return formatCurrency(value)
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
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
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
