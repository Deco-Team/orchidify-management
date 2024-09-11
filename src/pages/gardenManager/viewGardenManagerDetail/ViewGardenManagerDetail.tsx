import { Box, Grid, Theme, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PrimaryButton from '~/components/button/PrimaryButton'
import { GardenManagerStatus } from '~/global/constants'
import ActiveDialog from '../dialogs/ActiveDialog'
import DeactiveDialog from '../dialogs/DeactiveDialog'
import { Avatar, ContentText, ContentWrapper, Image, Label, Line, TitleWrapper } from './ViewGardenManagerDetail.styled'
import { notifyError } from '~/utils/toastify'
import { map } from 'lodash'
import { useGetGardenManagerByIdApi } from '~/hooks/api/garden-manager/useGetGardenManagerByIdApi'
interface FieldProps {
  label: string
  content: string | Array<{ _id: string; name: string }>
  theme: Theme
}

const Field: React.FC<FieldProps> = ({ label, content, theme }) => (
  <Grid container spacing={3}>
    <Grid item xs={2}>
      <Label theme={theme}>{label}</Label>
    </Grid>
    <Grid item xs={4}>
      <ContentText>{Array.isArray(content) ? JSON.stringify(content) : String(content)}</ContentText>
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
          <PrimaryButton
            color={theme.palette.warning.main}
            name='Cập nhật'
            variant='contained'
            type='button'
            onClick={handleUpdateButton}
          />
          {data?.status === GardenManagerStatus.ACTIVE ? (
            <PrimaryButton
              variant='contained'
              name='Vô hiệu hóa'
              type='button'
              color={theme.palette.error.main}
              onClick={handleOpenDeactiveDialog}
            />
          ) : (
            <PrimaryButton
              variant='contained'
              name='Kích hoạt'
              type='button'
              color={theme.palette.secondary.main}
              onClick={handleOpenActiveDialog}
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
          <Image src={data?.idCardPhoto} alt='Your Avatar' theme={theme} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant='h6' fontSize={24} fontWeight={600}>
              {data?.name}
            </Typography>
            <Typography variant='h6' fontSize={18} fontWeight={400} color={theme.palette.info.main}>
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
          <Field label='Tên nhà vườn' content={data?.name || ''} theme={theme} />
          <Field label='Email' content={data?.email || ''} theme={theme} />
          <Field
            label='Nhà vườn'
            content={map(data?.gardens || [], (garden) => garden.name).join(', ') || ''}
            theme={theme}
          />
          <Field label='Trạng thái' content={data?.status || ''} theme={theme} />
        </Box>
      </ContentWrapper>
      <DeactiveDialog
        open={openDeactiveDialog}
        handleClose={handleCloseDeactiveDialog}
        onSuccess={() => gardenManagerId && getGardenManagerById(gardenManagerId)}
      />
      <ActiveDialog
        open={openActiveDialog}
        handleClose={handleCloseActiveDialog}
        onSuccess={() => gardenManagerId && getGardenManagerById(gardenManagerId)}
      />
    </>
  )
}

export default ViewGardenManagerDetail
