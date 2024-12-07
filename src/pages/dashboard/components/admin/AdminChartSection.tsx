import { Grid } from '@mui/material'
import RevenueChart from './RevenueChart'
import StaffChart from './StaffChart'
import StaffTable from './StaffTable'
import TransactionChart from './TransactionChart'

const AdminChartSection = () => {
  return (
    <Grid container columnSpacing='1.875rem' rowSpacing='1.25rem'>
      <Grid item xs={12} lg={8}>
        <StaffTable />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StaffChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <RevenueChart />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TransactionChart />
      </Grid>
    </Grid>
  )
}

export default AdminChartSection
