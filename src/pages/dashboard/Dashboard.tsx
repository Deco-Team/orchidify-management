import { Typography } from '@mui/material'
import useAuth from '~/auth/useAuth'
import { UserRole } from '~/global/constants'
import StaffStatisticSection from './components/StaffStatisticSection'
import StaffChartSection from './components/StaffChartSection'

export default function Dashboard() {
  const { userTokenPayload } = useAuth()

  if (!userTokenPayload) return null

  switch (userTokenPayload.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />
    case UserRole.STAFF:
      return <StaffDashboard username={userTokenPayload.name || ''} />
    case UserRole.GARDEN_MANAGER:
      return <GardenManagerDashboard />
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

const GardenManagerDashboard = () => {
  return (
    <div>
      <h1>Garden Manager Dashboard</h1>
    </div>
  )
}
