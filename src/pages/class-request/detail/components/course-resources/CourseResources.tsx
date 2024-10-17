import { Paper } from '@mui/material'
import LessonList from './components/SessionList'
import { SessionDto } from '~/data/course.dto'

interface CourseResourcesProps {
  sessions: Array<SessionDto>
}

const CourseResources = ({ sessions }: CourseResourcesProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <LessonList sessions={sessions} />
    </Paper>
  )
}

export default CourseResources
