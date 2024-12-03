import { UserStatus } from '~/global/app-status'
import { ReportTotalSummaryType } from '~/global/constants'

export type ReportTotalSummaryListItemResponseDto = {
  _id: string
  type: ReportTotalSummaryType
  data: { [key: string]: unknown }
}

export type ReportStaffByStatusListItemResponseDto = {
  status: UserStatus
  quantity: number
}

export type ReportTransactionByDateListItemResponseDto = {
  _id: string
  date: string
  paymentAmount: number
  payoutAmount: number
}

export type ReportRevenueByMonthListItemResponseDto = {
  revenue: {
    total: number
  }
}
