import { ArrowForward } from '@mui/icons-material'
import { Box, Button, Grid, Link as MuiLink, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import Loading from '~/components/loading/Loading'
import Carousel from '~/components/slider/Carousel'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { ErrorResponseDto } from '~/data/error.dto'
import { Garden } from '~/data/garden.dto'
import { UserStatus } from '~/global/app-status'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import { ContentWrapper, Line, TitleWrapper } from '~/pages/garden-manager/detail/ViewGardenManagerDetail.styled'
import { Image } from '~/pages/garden/detail/ViewGardenDetail.styled'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import ActivateDialog from './components/ActivateDialog'
import DeactivateDialog from './components/DeactivateDialog'
import { APP_MESSAGE } from '~/global/app-message'
import useAuth from '~/auth/useAuth'
import { UserRole } from '~/global/constants'

const ViewGardenDetail = () => {
  const { userTokenPayload } = useAuth()
  const [data, setData] = useState<Garden | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const theme = useTheme()
  const params = useParams()
  const gardenId = params.id
  const { getGardenById } = useGardenApi()
  const navigate = useNavigate()

  const [openActivateDialog, setOpenActivateDialog] = useState<boolean>(false)
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState<boolean>(false)

  const breadcrumbsItems = [protectedRoute.gardenList, protectedRoute.gardenDetail]

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
    navigate(protectedRoute.updateGardenInfo.path.replace(':id', gardenId!))
  }

  const handleReloadData = async () => {
    if (gardenId) {
      const { data: gardenManager, error: apiError } = await getGardenById(gardenId)
      setData(gardenManager)
      setError(apiError)
    }
  }

  useEffect(() => {
    if (gardenId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: garden, error: apiError } = await getGardenById(gardenId)
        setData(garden)
        setError(apiError)
      })()
    }
  }, [gardenId, getGardenById])

  if (!gardenId) {
    notifyError(APP_MESSAGE.LOAD_DATA_FAILED('thông tin vườn'))
    navigate(protectedRoute.gardenList.path, { replace: true })
    return
  }

  if (error) {
    notifyError(error.message)
  }

  return data ? (
    <>
      <TitleWrapper>
        <div>
          <Typography variant='h5' fontSize={34} fontWeight={700}>
            Thông tin nhà vườn
          </Typography>
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
        <div style={{ display: 'flex' }}>
          <Button color='warning' onClick={handleUpdateButton} sx={{ marginRight: '24px' }}>
            Cập nhật
          </Button>
          {userTokenPayload && userTokenPayload.role === UserRole.STAFF && (
            <>
              {data?.status === UserStatus.ACTIVE ? (
                <Button color='error' onClick={handleOpenDeactivateDialog}>
                  Vô hiệu hóa
                </Button>
              ) : (
                <Button color='secondary' onClick={handleOpenActivateDialog}>
                  Kích hoạt
                </Button>
              )}
            </>
          )}
        </div>
      </TitleWrapper>
      <ContentWrapper theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' fontSize={24} fontWeight={700}>
            Thông tin nhà vườn
          </Typography>
          <Line theme={theme} />
        </div>
        <Grid container mt={1} rowGap={'20px'}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography fontWeight={500} width={'180px'}>
                Tên nhà vườn:
              </Typography>
              {data.name}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography fontWeight={500} width={'180px'}>
                Địa chỉ:
              </Typography>
              {data.address}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography fontWeight={500} width={'180px'}>
                Mô tả:
              </Typography>
              {data.description}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography fontWeight={500} width={'180px'}>
                Số lớp học tối đa:
              </Typography>
              {data.maxClass}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography fontWeight={500} width={'180px'}>
                Người quản lý:
              </Typography>
              {data.gardenManager.map((item) => item.name).join(', ')}
              {userTokenPayload && userTokenPayload.role === UserRole.STAFF ? (
                <Box sx={{ display: 'flex' }}>
                  <MuiLink
                    component={Link}
                    to={protectedRoute.updateGardenManagerOfGarden.path.replace(':id', gardenId)}
                    underline='always'
                    marginLeft={'50px'}
                    color={'inherit'}
                    fontWeight={500}
                    sx={{}}
                  >
                    Thay đổi quản lý vườn
                  </MuiLink>
                  <ArrowForward />
                </Box>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography fontWeight={500} width={'180px'}>
                Trạng thái:
              </Typography>
              <UserStatusTag type={data.status as UserStatus} />
            </Box>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Typography fontWeight={500} width={'180px'}>
          Hình ảnh nhà vườn
        </Typography>
        <Carousel>
          {data?.images?.map((value, index) => (
            <div
              key={index}
              style={{
                boxSizing: 'border-box'
              }}
            >
              <div style={{ width: '200px', height: '200px', padding: '0 2px' }}>
                <Image src={value} alt={`Garden Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </Carousel>
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

export default ViewGardenDetail
