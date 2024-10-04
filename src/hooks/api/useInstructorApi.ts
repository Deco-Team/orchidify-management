import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ListResponseDto } from '~/data/common.dto'
import { Instructor } from '~/data/instructor.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/instructors/management'

export const useInstructorApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAllInstructors = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<Instructor>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách giảng viên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getAllInstructors }
}
