import { Grid } from '@mui/material'
import MonthlyUserChart from './MonthlyUserChart'
import ClassChart from './ClassChart'
import PendingClassRequestChart from './PendingClassRequestChart'
import PendingPayoutRequestChart from './PendingPayoutRequestChart'
import PendingRecruitmentChart from './PendingRecruitmentChart'
import InterviewingRecruitmentChart from './InterviewingRecruitmentChart'

const StaffChartSection = () => {
  return (
    <Grid container columnSpacing='1.875rem' rowSpacing='1.25rem'>
      <Grid item xs={12} lg={6}>
        <MonthlyUserChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ClassChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <PendingClassRequestChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <PendingPayoutRequestChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <PendingRecruitmentChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <InterviewingRecruitmentChart />
      </Grid>
    </Grid>
  )
}

export default StaffChartSection
