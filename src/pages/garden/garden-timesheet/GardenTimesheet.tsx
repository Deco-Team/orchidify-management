import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import Loading from '~/components/loading/Loading'
import { ErrorResponseDto } from '~/data/error.dto'
import { Slot } from '~/data/garden-timesheet.dto'
import { Garden } from '~/data/garden.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { CalendarType } from '~/global/constants'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import useGardenTimesheetApi from '~/hooks/api/useGardenTimesheetApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import GardenCalendar from './components/GardenCalendar'

const GardenTimesheet = () => {
  const navigate = useNavigate()
  const { getGardenById } = useGardenApi()
  const { getGardenTimesheet } = useGardenTimesheetApi()
  const params = useParams()
  const gardenId = params.id

  const [data, setData] = useState<Garden | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)

  const [eventData, setEventData] = useState<Slot[]>([])

  const mapViewTypeToApi = (viewType: string) => {
    switch (viewType) {
      case 'dayGridMonth':
        return CalendarType.MONTH
      case 'timeGridWeek':
        return CalendarType.WEEK
      default:
        return CalendarType.MONTH
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

  const handleDatesChange = async (viewType: string, startDate: string) => {
    if (gardenId) {
      const apiViewType = mapViewTypeToApi(viewType)
      const { data: gardenTimesheet, error: apiError } = await getGardenTimesheet(gardenId, startDate, apiViewType)
      if (gardenTimesheet) {
        const transformedEventData = gardenTimesheet.map((slot) => ({
          ...slot,
          title: slot.classId
        }))

        setEventData(transformedEventData)
      }
      setError(apiError)
    }
  }

  if (!gardenId) {
    notifyError(APP_MESSAGE.LOAD_DATA_FAILED('thông tin quản lý vườn'))
    navigate(protectedRoute.gardenList.path, { replace: true })
    return
  }

  if (error) {
    notifyError(error.message)
  }

  const breadcrumbsItems = [
    protectedRoute.gardenList,
    {
      ...protectedRoute.gardenDetail,
      path: protectedRoute.gardenDetail.path.replace(':id', gardenId)
    },
    protectedRoute.viewGardenTimesheet
  ]
  return data ? (
    <Box sx={{ marginBottom: '40px' }}>
      <Typography variant='h1' sx={{ fontSize: '2rem', paddingBottom: '8px', fontWeight: 700 }}>
        Lịch
      </Typography>
      <Breadcrumbs items={breadcrumbsItems} />
      <Paper sx={{ width: '100%', marginY: '20px', padding: '24px' }}>
        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
            Thông tin nhà vườn
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
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
        </Grid>
      </Paper>
      <GardenCalendar events={eventData} onDatesChange={handleDatesChange} />
    </Box>
  ) : (
    <Loading />
  )
}

export default GardenTimesheet
