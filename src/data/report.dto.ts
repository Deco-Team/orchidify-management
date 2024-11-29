import { ClassStatus } from '~/global/app-status'
import { ReportTotalSummaryType } from '~/global/constants'

export type ReportTotalSummaryListItemResponseDto = {
  _id: string
  type: ReportTotalSummaryType
  data: { [key: string]: unknown }
}

export type ReportUserByMonthListItemResponseDto = {
  learner: { quantity: number }
  instructor: { quantity: number }
}

export type ReportClassByStatusListItemResponseDto = {
  status: ClassStatus
  quantity: number
}
