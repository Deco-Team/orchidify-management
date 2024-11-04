import { Box, Button, Typography } from '@mui/material'
import PageHeader from '~/components/header/PageHeader'
import { RecruitmentStatus } from '~/global/app-status'
import { protectedRoute } from '~/routes/routes'
import AddIcon from '@mui/icons-material/Add'
import useAuth from '~/auth/useAuth'

interface HeaderProps {
  recruitmentRequestStatus: RecruitmentStatus
  isInstructorAdded: boolean
  handledBy: string
  onProcessButtonClick: () => void
  onApproveButtonClick: () => void
  onRejectButtonClick: () => void
  onAddButtonClick: () => void
}

const Header = ({
  recruitmentRequestStatus,
  isInstructorAdded,
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
    if (recruitmentRequestStatus === RecruitmentStatus.SELECTED && staffId === handledBy) {
      return (
        <Box display='flex' alignItems='center'>
          <Typography variant='subtitle1' fontStyle='italic' height='fit-content' marginRight='0.5rem'>
            Đã thêm giảng viên
          </Typography>
          <Button color='secondary' onClick={onAddButtonClick} endIcon={<AddIcon />} disabled={isInstructorAdded}>
            Thêm
          </Button>
        </Box>
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
