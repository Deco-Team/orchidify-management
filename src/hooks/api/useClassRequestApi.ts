import { useCallback } from 'react'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { useProtectedApi } from './useProtectedApi'
import { APP_MESSAGE } from '~/global/app-message'
import { ErrorResponseDto } from '~/data/error.dto'
import { ListResponseDto } from '~/data/common.dto'

const ROOT_ENDPOINT = '/class-requests/management'

export const useClassRequestApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAllClassRequests = useCallback(
    async (
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
      filters: { field: string; value: unknown }[] = []
    ) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')
      let filtersFormat = {}
      filters.forEach((filter) => {
        filtersFormat = Object.assign({ [filter.field]: filter.value }, filtersFormat)
      })
      const result = await callAppProtectedApi<ListResponseDto<ClassRequestDto>>(
        endpoint,
        'GET',
        {},
        {
          page,
          limit: pageSize,
          sort: sortingFormat,
          ...filtersFormat
        },
        {}
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách yêu cầu lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

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

  return { getAllClassRequests, getClassRequestById }
}
