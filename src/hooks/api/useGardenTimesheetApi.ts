import { useCallback } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { Slot } from '~/data/garden-timesheet.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'

const ROOT_ENDPOINT = '/garden-timesheets/management'

const useGardenTimesheetApi = () => {
  const { callAppProtectedApi } = useProtectedApi()
  const getGardenTimesheet = useCallback(
    async (gardenId: string, date: string, type: string) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const result = await callAppProtectedApi<{ docs: Slot[] }>(endpoint, 'GET', {}, { gardenId, date, type }, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin lịch nhà vườn') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getGardenTimesheet }
}

export default useGardenTimesheetApi
