import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'
import { GardenManager } from '~/data/gardenManager.dto'
import { useAuthApi } from '../useAuthApi'

const ROOT_ENDPOINT = '/garden-managers'

export const useGetGardenManagerByIdApi = () => {
  const { data, error, callAuthApi } = useAuthApi<GardenManager>()

  const getGardenManagerById = useCallback(
    async (gardenManagerId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${gardenManagerId}`
      await callAuthApi(endpoint, 'GET', {}, {}, {})
    },
    [callAuthApi]
  )
  if (error) {
    if (error.response) {
      return { data: null, error: error.response.data as ErrorResponseDto, getGardenManagerById }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin giảng viên') } as ErrorResponseDto,
      getGardenManagerById
    }
  }

  return { data: data, error: null, getGardenManagerById }
}
