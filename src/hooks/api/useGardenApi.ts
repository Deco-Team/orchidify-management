import { useCallback } from 'react'
import { IdResponseDto, ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { Garden } from '~/data/garden.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'

const ROOT_ENDPOINT = '/gardens'

interface AddGardenRequest {
  name: string
  address: string
  gardenManagerId: string
  description: string
  images: string[]
}

export const useGardenApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAllGardens = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<Garden>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách nhà vườn') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getGardenById = useCallback(
    async (gardenId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${gardenId}`
      const result = await callAppProtectedApi<Garden>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin nhà vườn') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const addGarden = useCallback(
    async (garden: AddGardenRequest) => {
      const result = await callAppProtectedApi<IdResponseDto>(ROOT_ENDPOINT, 'POST', {}, {}, garden)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_FAILED('thêm nhà vườn') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getAllGardens, getGardenById, addGarden }
}
