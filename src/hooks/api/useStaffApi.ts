import { useCallback } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { Staff } from '~/data/staff.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'

const ROOT_ENDPOINT = '/staffs'

const useStaffApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAllStaffs = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<Staff>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách nhân viên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getAllStaffs
  }
}

export default useStaffApi
