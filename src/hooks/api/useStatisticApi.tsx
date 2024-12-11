import { useCallback } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { ReportClassByStatusListItemResponseDto } from '~/data/report.dto'
import {
  ReportCourseByMonthListItemResponseDto,
  ReportCourseByRateListItemResponseDto,
  ReportInstructorByMonthListItemResponseDto,
  ReportLearnerByMonthListItemResponseDto,
  ReportLearnerByStatusListItemResponseDto,
  ReportStaffByStatusListItemResponseDto
} from '~/data/reportAdmin.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'

const ROOT_ENDPOINT = '/reports/management/admin'

export const useStatisticApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getReportCourseByMonth = useCallback(
    async (year: number) => {
      const endpoint = `${ROOT_ENDPOINT}/course-by-month`
      const result = await callAppProtectedApi<ListResponseDto<ReportCourseByMonthListItemResponseDto>>(
        endpoint,
        'GET',
        {},
        { year }
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số doanh thu trong tháng') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getReportCourseByRate = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/course-by-rate`
    const result = await callAppProtectedApi<ListResponseDto<ReportCourseByRateListItemResponseDto>>(endpoint, 'GET')

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo khóa học theo đánh giá') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getReportClassByStatus = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/class-by-status`
    const result = await callAppProtectedApi<ListResponseDto<ReportClassByStatusListItemResponseDto>>(endpoint, 'GET')

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số lượng lớp học theo trạng thái') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getReportClassByRate = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/class-by-rate`
    const result = await callAppProtectedApi<ListResponseDto<ReportCourseByRateListItemResponseDto>>(endpoint, 'GET')

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo lớp học theo đánh giá') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getReportInstructorByMonth = useCallback(
    async (year: number) => {
      const endpoint = `${ROOT_ENDPOINT}/instructor-by-month`
      const result = await callAppProtectedApi<ListResponseDto<ReportInstructorByMonthListItemResponseDto>>(
        endpoint,
        'GET',
        {},
        { year }
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số giảng viên mới trong tháng') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getReportInstructorDataByStatus = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/instructor-by-status`
    const result = await callAppProtectedApi<ListResponseDto<ReportStaffByStatusListItemResponseDto>>(endpoint, 'GET')

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: {
        message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số lượng giảng viên theo trạng thái')
      } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getReportLearnerByMonth = useCallback(
    async (year: number) => {
      const endpoint = `${ROOT_ENDPOINT}/learner-by-month`
      const result = await callAppProtectedApi<ListResponseDto<ReportLearnerByMonthListItemResponseDto>>(
        endpoint,
        'GET',
        {},
        { year }
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số học viên mới trong tháng') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getReportLearnerDataByStatus = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/learner-by-status`
    const result = await callAppProtectedApi<ListResponseDto<ReportLearnerByStatusListItemResponseDto>>(endpoint, 'GET')

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: {
        message: APP_MESSAGE.LOAD_DATA_FAILED('báo cáo số lượng học viên theo trạng thái')
      } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  return {
    getReportCourseByMonth,
    getReportCourseByRate,
    getReportClassByStatus,
    getReportClassByRate,
    getReportInstructorByMonth,
    getReportInstructorDataByStatus,
    getReportLearnerByMonth,
    getReportLearnerDataByStatus
  }
}
