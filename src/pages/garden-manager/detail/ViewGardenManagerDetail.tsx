import { Box, Button, Grid, Theme, Typography, useTheme } from '@mui/material'
import { lazy, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, ContentText, ContentWrapper, Image, Label, Line, TitleWrapper } from './ViewGardenManagerDetail.styled'
import { notifyError } from '~/utils/toastify'
import { map } from 'lodash'
import { useGardenManagerApi } from '~/hooks/api/useGardenManagerApi'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { UserStatus } from '~/global/app-status'
import { GardenManager } from '~/data/gardenManager.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
const ActivateDialog = lazy(() => import('./components/ActivateDialog'))
const DeactivateDialog = lazy(() => import('./components/DeactivateDialog'))

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
  const [data, setData] = useState<GardenManager | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const theme = useTheme()
  const params = useParams()
  const gardenManagerId = params.id
  const { getGardenManagerById } = useGardenManagerApi()

  const [openActivateDialog, setOpenActivateDialog] = useState<boolean>(false)
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState<boolean>(false)

  const breadcrumbsItems = [protectedRoute.gardenManagerList, protectedRoute.addGardenManager]

  const handleOpenActivateDialog = () => {
    setOpenActivateDialog(true)
  }

  const handleCloseActivateDialog = () => {
    setOpenActivateDialog(false)
  }

  const handleOpenDeactivateDialog = () => {
    setOpenDeactivateDialog(true)
  }

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false)
  }

  const handleUpdateButton = () => {
    alert('update')
  }

  const handleReloadData = async () => {
    if (gardenManagerId) {
      const { data: gardenManager, error: apiError } = await getGardenManagerById(gardenManagerId)
      setData(gardenManager)
      setError(apiError)
    }
  }

  useEffect(() => {
    if (gardenManagerId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: gardenManager, error: apiError } = await getGardenManagerById(gardenManagerId)
        setData(gardenManager)
        setError(apiError)
      })()
    }
  }, [gardenManagerId, getGardenManagerById])

  if (error) {
    notifyError(error.message)
  }

  return data ? (
    <>
      <TitleWrapper>
        <div>
          <Typography variant='h5' fontSize={34} fontWeight={700}>
            Thông tin quản lý vườn
          </Typography>
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
        <div style={{ display: 'flex' }}>
          <Button color='warning' onClick={handleUpdateButton} sx={{ marginRight: '24px' }}>
            Cập nhật
          </Button>
          {data?.status === UserStatus.ACTIVE ? (
            <Button color='error' onClick={handleOpenDeactivateDialog}>
              Vô hiệu hóa
            </Button>
          ) : (
            <Button color='secondary' onClick={handleOpenActivateDialog}>
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
        open={openDeactivateDialog}
        handleClose={handleCloseDeactivateDialog}
        onSuccess={handleReloadData}
      />
      <ActivateDialog open={openActivateDialog} handleClose={handleCloseActivateDialog} onSuccess={handleReloadData} />
    </>
  ) : (
    <Loading />
  )
}

export default ViewGardenManagerDetail
