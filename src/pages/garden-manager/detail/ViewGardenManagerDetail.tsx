import { Box, Button, Grid, Theme, Typography, useTheme } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivateDialog from './components/ActivateDialog'
import DeactivateDialog from './components/DeactivateDialog'
import { Avatar, ContentText, ContentWrapper, Image, Label, Line, TitleWrapper } from './ViewGardenManagerDetail.styled'
import { notifyError } from '~/utils/toastify'
import { map } from 'lodash'
import { useGetGardenManagerByIdApi } from '~/hooks/api/garden-manager/useGetGardenManagerByIdApi'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { UserStatus } from '~/global/app-status'
interface FieldProps {
  label: string
  content: ReactNode
  theme: Theme
}

const Field: React.FC<FieldProps> = ({ label, content, theme }) => (
  <Grid container spacing={3}>
    <Grid item xs={2}>
      <Label theme={theme}>{label}</Label>
    </Grid>
    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
      {content}
    </Grid>
  </Grid>
)

const ViewGardenManagerDetail = () => {
  const theme = useTheme()
  const params = useParams()
  const gardenManagerId = params.id
  const { data, error, getGardenManagerById } = useGetGardenManagerByIdApi()

  const [openActiveDialog, setOpenActiveDialog] = useState<boolean>(false)
  const [openDeactiveDialog, setOpenDeactiveDialog] = useState<boolean>(false)

  const handleOpenActiveDialog = () => {
    setOpenActiveDialog(true)
  }

  const handleCloseActiveDialog = () => {
    setOpenActiveDialog(false)
  }

  const handleOpenDeactiveDialog = () => {
    setOpenDeactiveDialog(true)
  }

  const handleCloseDeactiveDialog = () => {
    setOpenDeactiveDialog(false)
  }

  const handleUpdateButton = () => {
    alert('update')
  }

  useEffect(() => {
    if (gardenManagerId) {
      getGardenManagerById(gardenManagerId)
    }
  }, [])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Thông tin quản lý vườn
        </Typography>
        <div style={{ display: 'flex' }}>
          <Button color='warning' onClick={handleUpdateButton} sx={{ marginRight: '24px' }}>
            Cập nhật
          </Button>
          {data?.status === UserStatus.ACTIVE ? (
            <Button color='error' onClick={handleOpenDeactiveDialog}>
              Vô hiệu hóa
            </Button>
          ) : (
            <Button color='secondary' onClick={handleOpenActiveDialog}>
              Kích hoạt
            </Button>
          )}
        </div>
      </TitleWrapper>
      <ContentWrapper theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' fontSize={24} fontWeight={700}>
            Thông tin hệ thống
          </Typography>

          <Line theme={theme} />
        </div>
        <Avatar>
          <Image src={data?.idCardPhoto} alt='Your Avatar' theme={theme} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant='h6' fontSize={20} fontWeight={500}>
              {data?.name}
            </Typography>
            <Typography variant='h6' fontSize={14} fontWeight={500} color={theme.label.secondary}>
              Quản lý vườn
            </Typography>
          </div>
        </Avatar>
      </ContentWrapper>
      <ContentWrapper theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' fontSize={24} fontWeight={700}>
            Thông tin cá nhân
          </Typography>
          <Line theme={theme} />
        </div>
        <Box>
          <Field label='Tên nhà vườn' content={<ContentText>{data?.name || ''}</ContentText>} theme={theme} />
          <Field label='Email' content={<ContentText>{data?.email || ''}</ContentText>} theme={theme} />
          <Field
            label='Nhà vườn'
            content={<ContentText>{map(data?.gardens || [], (garden) => garden.name).join(', ') || ''}</ContentText>}
            theme={theme}
          />
          <Field
            label='Trạng thái'
            content={data ? <UserStatusTag type={UserStatus[data.status]} /> : null}
            theme={theme}
          />
        </Box>
      </ContentWrapper>
      <DeactivateDialog
        open={openDeactiveDialog}
        handleClose={handleCloseDeactiveDialog}
        onSuccess={() => gardenManagerId && getGardenManagerById(gardenManagerId)}
      />
      <ActivateDialog
        open={openActiveDialog}
        handleClose={handleCloseActiveDialog}
        onSuccess={() => gardenManagerId && getGardenManagerById(gardenManagerId)}
      />
    </>
  )
}

export default ViewGardenManagerDetail
