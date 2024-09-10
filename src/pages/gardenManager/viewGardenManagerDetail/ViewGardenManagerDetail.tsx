import { Box, Grid, Theme, Typography, useTheme } from '@mui/material'
import { Suspense, useState } from 'react'
import PrimaryButton from '~/components/button/PrimaryButton'
import Loading from '~/components/loading/Loading'
import { GardenManagerStatus } from '~/global/constants'
import { IGardenManager } from '~/global/interfaces/gardenManagerInterface'
import { gardenManager } from '~/mock/gardenManagers'
import ActiveDialog from '../dialogs/ActiveDialog'
import DeactiveDialog from '../dialogs/DeactiveDialog'
import { Avatar, ContentText, ContentWrapper, Image, Label, Line, TitleWrapper } from './ViewGardenManagerDetail.styled'
interface FieldProps {
  label: string
  content: string
  theme: Theme
}

const Field: React.FC<FieldProps> = ({ label, content, theme }) => (
  <Grid container spacing={3}>
    <Grid item xs={2}>
      <Label theme={theme}>{label}</Label>
    </Grid>
    <Grid item xs={4}>
      <ContentText>{content}</ContentText>
    </Grid>
  </Grid>
)

const ViewGardenManagerDetail = () => {
  const theme = useTheme()
  const [gardenManagerData, setGardenManagerData] = useState<IGardenManager>(gardenManager)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleUpdateButton = () => {
    alert('update')
  }
  return (
    <Suspense fallback={<Loading />}>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Thông tin quản lý vườn
        </Typography>
        <div style={{ display: 'flex' }}>
          <PrimaryButton
            color={theme.palette.warning.main}
            name='Cập nhật'
            variant='contained'
            type='button'
            onClick={handleUpdateButton}
          />
          {gardenManagerData.info.status === GardenManagerStatus.ACTIVE ? (
            <PrimaryButton
              variant='contained'
              name='Vô hiệu hóa'
              type='button'
              color={theme.palette.error.main}
              onClick={handleOpenDialog}
            />
          ) : (
            <PrimaryButton
              variant='contained'
              name='Kích hoạt'
              type='button'
              color={theme.palette.secondary.main}
              onClick={handleOpenDialog}
            />
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
          <Image src={gardenManagerData.url} alt='Your Avatar' theme={theme} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant='h6' fontSize={24} fontWeight={600}>
              {gardenManagerData.name}
            </Typography>
            <Typography variant='h6' fontSize={18} fontWeight={400} color={theme.palette.info.main}>
              {gardenManagerData.role}
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
          <Field label='Tên nhà vườn' content={gardenManagerData.name} theme={theme} />
          <Field label='Email' content={gardenManagerData.info.email} theme={theme} />
          <Field label='Nhà vườn' content={gardenManagerData.info.garden} theme={theme} />
          <Field label='Trạng thái' content={gardenManagerData.info.status} theme={theme} />
        </Box>
      </ContentWrapper>
      <DeactiveDialog open={openDialog} handleClose={handleCloseDialog} />
      <ActiveDialog open={openDialog} handleClose={handleCloseDialog} />
    </Suspense>
  )
}

export default ViewGardenManagerDetail
