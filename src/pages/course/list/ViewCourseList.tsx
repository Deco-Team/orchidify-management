import PageHeader from '~/components/header/PageHeader'
import CustomTabs from '~/components/tabs/CustomTabs'
import { CourseStatus } from '~/global/app-status'
import CourseTable from './components/CourseTable'
import { TitleWrapper } from './ViewCourseList.styled'

const ViewCourseList = () => {
  return (
    <>
      <TitleWrapper>
        <PageHeader title='Lớp học' />
      </TitleWrapper>
      <CustomTabs
        name='courseList'
        items={[
          { label: 'Chờ duyệt', content: <CourseTable statusFilter={CourseStatus.REQUESTING} /> },
          { label: 'Công khai', content: <CourseTable statusFilter={CourseStatus.ACTIVE} /> }
        ]}
      />
    </>
  )
}

export default ViewCourseList
