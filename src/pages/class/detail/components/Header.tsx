import { Box, Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { ClassStatus } from '~/global/app-status'
import { protectedRoute } from '~/routes/routes'

interface HeaderProps {
  classStatus: ClassStatus
  onCompleteButtonClick: () => void
  onCancelButtonClick: () => void
}

const Header = ({ classStatus }: HeaderProps) => {
  const breadcrumbsItems = [protectedRoute.classList, protectedRoute.classDetail]

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết lớp học' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {classStatus === ClassStatus.COMPLETED ? <Button color='secondary'>Kết thucs</Button> : null}
        {classStatus === ClassStatus.PUBLISHED || classStatus === ClassStatus.IN_PROGRESS ? (
          <Button color='error'>Hủy</Button>
        ) : null}
      </Box>
    </Box>
  )
}

export default Header
