import { GardenTimesheetDto } from '~/data/garden-timesheet.dto'
import { useProtectedApi } from './useProtectedApi'
import { useCallback } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/garden-timesheets/management'

const useGardenTimesheetApi = () => {
  const { callAppProtectedApi } = useProtectedApi()
  const getGardenTimesheet = useCallback(
    async (gardenId: string, date: string, type: string) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const result = await callAppProtectedApi<GardenTimesheetDto>(endpoint, 'GET', {}, { gardenId, date, type }, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('lịch') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getGardenTimesheet }
}

export default useGardenTimesheetApi
