import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useCallback } from 'react'
import { GardenManager } from '~/data/gardenManager.dto'
import { useProtectedApi } from './useProtectedApi'
import { SuccessResponseDto } from '~/data/common.dto'

const ROOT_ENDPOINT = '/garden-managers'

export const useGardenManagerApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getGardenManagerById = useCallback(
    async (gardenManagerId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${gardenManagerId}`
      const result = await callAppProtectedApi<GardenManager>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin giảng viên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const activateGardenManager = useCallback(
    async (gardenManagerId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${gardenManagerId}/active`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('Vô hiệu hóa') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const deactivateGardenManager = useCallback(
    async (gardenManagerId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${gardenManagerId}/deactivate`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('Kích hoạt') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getGardenManagerById, activateGardenManager, deactivateGardenManager }
}
