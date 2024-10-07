import { useCallback } from 'react'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { useProtectedApi } from './useProtectedApi'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'

const ROOT_ENDPOINT = '/class-requests/management'

export const useClassRequestApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getClassRequestById = useCallback(
    async (classRequestId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classRequestId}`
      const result = await callAppProtectedApi<ClassRequestDto>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin yêu cầu') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getClassRequestById }
}
