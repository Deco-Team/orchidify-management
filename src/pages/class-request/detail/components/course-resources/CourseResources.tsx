import { Paper } from '@mui/material'
import SessionList from './components/SessionList'
import { SessionDto } from '~/data/course.dto'

interface CourseResourcesProps {
  sessions: Array<SessionDto>
}

const CourseResources = ({ sessions }: CourseResourcesProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <SessionList sessions={sessions} />
    </Paper>
  )
}

export default CourseResources
