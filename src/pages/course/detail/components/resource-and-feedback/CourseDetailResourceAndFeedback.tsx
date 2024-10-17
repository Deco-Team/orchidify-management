import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import SessionTable from './resource/SessionTable'
import { SessionDto } from '~/data/course.dto'

interface CourseDetailResourceAndFeedbackProps {
  sessions: SessionDto[]
  courseId: string
}

const CourseDetailResourceAndFeedback = ({ sessions, courseId }: CourseDetailResourceAndFeedbackProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='courseDetail'
        items={[{ label: 'BUỔI HỌC', content: <SessionTable courseId={courseId} sessions={sessions} /> }]}
      />
    </Paper>
  )
}

export default CourseDetailResourceAndFeedback
