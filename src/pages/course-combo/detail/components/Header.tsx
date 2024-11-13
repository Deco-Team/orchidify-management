import PageHeader from '~/components/header/PageHeader'
import { protectedRoute } from '~/routes/routes'

const Header = () => {
  const breadcrumbsItems = [protectedRoute.courseComboList, protectedRoute.courseComboDetail]

  return <PageHeader title='Chi tiết Combo khóa học' breadcrumbsItems={breadcrumbsItems} />
}

export default Header
