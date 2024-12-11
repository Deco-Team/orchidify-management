import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { ReportStaffByStatusListItemResponseDto } from '~/data/reportAdmin.dto'
import { UserStatus } from '~/global/app-status'
import { useStatisticApi } from '~/hooks/api/useStatisticApi'
import { notifyError } from '~/utils/toastify'

const InstructorStatusChart = () => {
  const { getReportInstructorDataByStatus } = useStatisticApi()
  const [chartData, setChartData] = useState<ListResponseDto<ReportStaffByStatusListItemResponseDto>>({
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
      const { data: reportData, error: apiError } = await getReportInstructorDataByStatus()
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
  }, [getReportInstructorDataByStatus])

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
          Trạng thái giảng viên
        </Typography>
      </Box>
      <ChartDisplay data={chartData.docs} />
    </Paper>
  )
}

export default InstructorStatusChart

interface ChartDisplayProps {
  data: ReportStaffByStatusListItemResponseDto[]
}

const ChartDisplay = ({ data }: ChartDisplayProps) => {
  const chartSeries: ApexCharts.ApexOptions['series'] = useMemo(() => {
    const series: ApexCharts.ApexOptions['series'] = [
      data.find((item) => item.status === UserStatus.ACTIVE)?.quantity || 0,
      data.find((item) => item.status === UserStatus.INACTIVE)?.quantity || 0
    ]

    return series
  }, [data])

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false }
    },
    labels: ['Hoạt động', 'Vô hiệu hóa'],
    colors: ['#20C017', '#F66868'],
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
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng'
            }
          }
        }
      }
    }
  }

  return <Chart type='donut' options={chartOptions} series={chartSeries} height='337px' />
}
