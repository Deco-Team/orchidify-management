import { MenuBookSharp, SchoolOutlined, CoPresentOutlined, ContactPageOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import StatisticCard from '~/components/card/StatisticCard'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { ReportTotalSummaryListItemResponseDto } from '~/data/report.dto'
import { ReportTotalSummaryType } from '~/global/constants'
import { useReportApi } from '~/hooks/api/useReportApi'
import { notifyError } from '~/utils/toastify'

const StaffStatisticSection = () => {
  const { getReportTotalSummary } = useReportApi()
  const [data, setData] = useState<ListResponseDto<ReportTotalSummaryListItemResponseDto>>({
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
      const { data: reportData, error: apiError } = await getReportTotalSummary()
      if (reportData) {
        setData(reportData)
      } else {
        setData({
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
  }, [getReportTotalSummary])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Grid container gap='1.875rem' marginBottom='1.25rem'>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Khóa học'
          value={
            (data.docs.find((item) => item.type === ReportTotalSummaryType.CourseSum)?.data.quantity as number) || 0
          }
          Icon={MenuBookSharp}
          bgcolor='#F88C3D66'
          borderColor='#FF9242'
          iconBgcolor='#FF9242'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Học viên'
          value={
            (data.docs.find((item) => item.type === ReportTotalSummaryType.LearnerSum)?.data.quantity as number) || 0
          }
          Icon={SchoolOutlined}
          bgcolor='#5BADD066'
          borderColor='#5BADD0'
          iconBgcolor='#5BADD0'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Giảng viên'
          value={
            (data.docs.find((item) => item.type === ReportTotalSummaryType.InstructorSum)?.data.quantity as number) || 0
          }
          Icon={CoPresentOutlined}
          bgcolor='#FFCF2266'
          borderColor='#FFCF22'
          iconBgcolor='#FFCF22'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Combo khóa học'
          value={
            (data.docs.find((item) => item.type === ReportTotalSummaryType.CourseComboSum)?.data.quantity as number) ||
            0
          }
          Icon={ContactPageOutlined}
          bgcolor='#20C01766'
          borderColor='#20C017'
          iconBgcolor='#20C017'
        />
      </Grid>
    </Grid>
  )
}

export default StaffStatisticSection
