import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'
import { GardenManager } from '~/data/gardenManager.dto'
import { useAuthApi } from '../useAuthApi'
import { notifyLoading } from '~/utils/toastify'

const ROOT_ENDPOINT = '/garden-managers'

export const useDeactiveGardenManagerApi = () => {
  const { data, error, callAuthApi } = useAuthApi<GardenManager>()

  const deactiveGardenManager = useCallback(
    async (gardenManagerId: string) => {
      notifyLoading()
      const endpoint = `${ROOT_ENDPOINT}/${gardenManagerId}/deactivate`
      await callAuthApi(endpoint, 'PATCH', {}, {}, {})
    },
    [callAuthApi]
  )
  if (error) {
    if (error.response) {
      return { data: null, error: error.response.data as ErrorResponseDto, deactiveGardenManager }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.ACTION_FAILED('Vô hiệu hóa') } as ErrorResponseDto,
      deactiveGardenManager
    }
  }

  return { data: data, error: null, deactiveGardenManager }
}
