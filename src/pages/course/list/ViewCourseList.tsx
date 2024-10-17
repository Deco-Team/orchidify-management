import PageHeader from '~/components/header/PageHeader'
import CourseTable from './components/CourseTable'
import { TitleWrapper } from './ViewCourseList.styled'

const ViewCourseList = () => {
  return (
    <>
      <TitleWrapper>
        <PageHeader title='Khóa học' />
      </TitleWrapper>
      <CourseTable />
    </>
  )
}

export default ViewCourseList
