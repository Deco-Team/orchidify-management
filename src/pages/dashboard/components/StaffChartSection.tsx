import { Grid } from '@mui/material'
import MonthlyUserChart from './MonthlyUserChart'
import ClassChart from './ClassChart'
import PendingClassRequestChart from './PendingClassRequestChart'
import PendingPayoutRequestChart from './PendingPayoutRequestChart'
import PendingRecruitmentChart from './PendingRecruitmentChart'
import InterviewingRecruitmentChart from './InterviewingRecruitmentChart'

const StaffChartSection = () => {
  return (
    <Grid container columnGap='1.875rem' rowGap='1.25rem'>
      <Grid item xs={12} lg={5.7}>
        <MonthlyUserChart />
      </Grid>
      <Grid item xs={12} lg={5.7}>
        <ClassChart />
      </Grid>
      <Grid item xs={12} lg={5.7}>
        <PendingClassRequestChart />
      </Grid>
      <Grid item xs={12} lg={5.7}>
        <PendingPayoutRequestChart />
      </Grid>
      <Grid item xs={12} lg={5.7}>
        <PendingRecruitmentChart />
      </Grid>
      <Grid item xs={12} lg={5.7}>
        <InterviewingRecruitmentChart />
      </Grid>
    </Grid>
  )
}

export default StaffChartSection
