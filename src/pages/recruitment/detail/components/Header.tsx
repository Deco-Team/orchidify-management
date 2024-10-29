import { Box, Button } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { RecruitmentStatus } from '~/global/app-status'
import { protectedRoute } from '~/routes/routes'
import AddIcon from '@mui/icons-material/Add'
import useAuth from '~/auth/useAuth'

interface HeaderProps {
  recruitmentRequestStatus: RecruitmentStatus
  handledBy: string
  onProcessButtonClick: () => void
  onApproveButtonClick: () => void
  onRejectButtonClick: () => void
  onAddButtonClick: () => void
}

const Header = ({
  recruitmentRequestStatus,
  handledBy,
  onProcessButtonClick,
  onApproveButtonClick,
  onRejectButtonClick,
  onAddButtonClick
}: HeaderProps) => {
  const { userTokenPayload } = useAuth()
  const staffId = userTokenPayload?.sub

  const breadcrumbsItems = [protectedRoute.recruitmentList, protectedRoute.recruitmentDetail]

  const renderButtons = () => {
    if (recruitmentRequestStatus === RecruitmentStatus.INTERVIEWING && staffId === handledBy) {
      return (
        <>
          <Button color='secondary' onClick={onApproveButtonClick}>
            Chấp nhận
          </Button>
          <Button color='error' onClick={onRejectButtonClick}>
            Từ chối
          </Button>
        </>
      )
    }
    if (recruitmentRequestStatus === RecruitmentStatus.PENDING) {
      return (
        <>
          <Button color='secondary' onClick={onProcessButtonClick}>
            Xử lý
          </Button>
          <Button color='error' onClick={onRejectButtonClick}>
            Từ chối
          </Button>
        </>
      )
    }
    if (recruitmentRequestStatus === RecruitmentStatus.SELECTED) {
      return (
        <Button color='secondary' onClick={onAddButtonClick} endIcon={<AddIcon />}>
          Thêm
        </Button>
      )
    }
  }

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <PageHeader title='Chi tiết đơn tuyển' breadcrumbsItems={breadcrumbsItems} />
      <Box display='flex' justifyContent='space-between' gap='1.5rem'>
        {renderButtons()}
      </Box>
    </Box>
  )
}

export default Header
