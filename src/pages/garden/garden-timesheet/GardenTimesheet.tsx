import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import Loading from '~/components/loading/Loading'
import { ErrorResponseDto } from '~/data/error.dto'
import { Slot } from '~/data/gardenTimesheet.dto'
import { Garden } from '~/data/garden.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { CalendarType } from '~/global/constants'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import useGardenTimesheetApi from '~/hooks/api/useGardenTimesheetApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import GardenCalendar from './components/GardenCalendar'
import { GardenTimesheetStatus } from '~/global/app-status'

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
      ;(async () => {
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
        let transformedEventData: (Slot & {
          title?: string
          allDay?: boolean
          display?: string
          backgroundColor?: string
        })[] = []

        if (apiViewType === CalendarType.MONTH) {
          const gardenTimesheetMap = new Map<
            string,
            { [key: string]: { start: string; end: string; status: GardenTimesheetStatus; classQuantity: number } }
          >()
          gardenTimesheet.forEach((slot) => {
            if (slot.status !== GardenTimesheetStatus.INACTIVE) {
              const date = new Date(slot.start).getDate().toString()
              const dateData = gardenTimesheetMap.get(date)
              if (dateData) {
                gardenTimesheetMap.set(date, {
                  ...dateData,
                  [slot.slotNumber!]: {
                    start: slot.start,
                    end: slot.end,
                    status: slot.status,
                    classQuantity: dateData[slot.slotNumber!] ? dateData[slot.slotNumber!].classQuantity + 1 : 1
                  }
                })
              } else {
                gardenTimesheetMap.set(date, {
                  [slot.slotNumber!]: {
                    start: slot.start,
                    end: slot.end,
                    status: slot.status,
                    classQuantity: 1
                  }
                })
              }
            } else {
              transformedEventData.push({
                ...slot,
                allDay: true,
                display: 'background',
                backgroundColor: '#d0d0d0'
              })
            }
          })

          gardenTimesheetMap.forEach((value) => {
            transformedEventData.push(
              ...Object.keys(value).map((slotNumber) => ({
                ...value[slotNumber],
                title: `Tiết ${slotNumber} (${value[slotNumber].classQuantity})`,
                display: 'block'
              }))
            )
          })
        } else {
          transformedEventData = gardenTimesheet.map((slot) =>
            slot.status !== GardenTimesheetStatus.INACTIVE
              ? {
                  ...slot,
                  title: slot.classId!,
                  display: 'block',
                  backgroundColor: '#0ea5e919'
                }
              : {
                  ...slot,
                  display: 'background',
                  backgroundColor: '#d0d0d0'
                }
          )
        }

        setEventData(transformedEventData)
      }
      setError(apiError)
    }
  }

  if (!gardenId) {
    notifyError(APP_MESSAGE.LOAD_DATA_FAILED('thông tin lịch nhà vườn'))
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
