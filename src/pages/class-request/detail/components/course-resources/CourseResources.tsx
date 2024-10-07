import { Paper } from '@mui/material'
import CustomTabs from '~/components/tabs/CustomTabs'
import LessonList from './components/LessonList'
import { AssignmentDto, LessonDto } from '~/data/course.dto'
import AssignmentList from './components/AssignmentList'

interface CourseResourcesProps {
  lessons: Array<LessonDto>
  assignments: Array<AssignmentDto>
}

const CourseResources = ({ lessons, assignments }: CourseResourcesProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <CustomTabs
        name='classRequestDetail'
        items={[
          { label: 'BÀI HỌC', content: <LessonList lessons={lessons} /> },
          {
            label: 'BÀI TẬP',
            content: <AssignmentList assignments={assignments} />
          }
        ]}
      />
    </Paper>
  )
}

export default CourseResources
