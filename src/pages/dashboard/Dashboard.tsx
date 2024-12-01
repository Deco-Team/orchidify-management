import { Typography } from '@mui/material'
import useAuth from '~/auth/useAuth'
import { UserRole } from '~/global/constants'
import StaffStatisticSection from './components/staff/StaffStatisticSection'
import StaffChartSection from './components/staff/StaffChartSection'
import GardenManagerGardenInfoSection from './components/garden-manager/GardenManagerGardenInfoSection'
import GardenManagerTimesheetSection from './components/garden-manager/GardenManagerTimesheetSection'

export default function Dashboard() {
  const { userTokenPayload } = useAuth()

  if (!userTokenPayload) return null

  switch (userTokenPayload.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />
    case UserRole.STAFF:
      return <StaffDashboard username={userTokenPayload.name || ''} />
    case UserRole.GARDEN_MANAGER:
      return <GardenManagerDashboard username={userTokenPayload.name || ''} />
    default:
      return null
  }
}

interface DashboardProps {
  username: string
}

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  )
}

const StaffDashboard = ({ username }: DashboardProps) => {
  return (
    <>
      <Typography variant='h1' fontSize='2.125rem' fontWeight='700' marginBottom='1.25rem'>
        Xin chào, {username}
      </Typography>
      <StaffStatisticSection />
      <StaffChartSection />
    </>
  )
}

const GardenManagerDashboard = ({ username }: DashboardProps) => {
  return (
    <>
      <Typography variant='h1' fontSize='2.125rem' fontWeight='700' marginBottom='1.25rem'>
        Xin chào, {username}
      </Typography>
      <GardenManagerGardenInfoSection />
      <GardenManagerTimesheetSection />
    </>
  )
}
