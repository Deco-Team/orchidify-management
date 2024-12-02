import { RequestStatus } from '~/global/app-status'
import { BaseMediaDto } from './common.dto'

export type PayoutRequestListItemDto = {
  _id: string
  amount: number
  status: RequestStatus
  rejectReason?: string
  histories: Array<unknown>
  description: string
  createdBy: {
    email: string
    _id: string
    name: string
    phone: string
    idCardPhoto: string
    avatar: string
  }
  hasMadePayout: boolean
  handledBy?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export type PayoutRequestDetailDto = {
  _id: string
  amount: number
  status: RequestStatus
  rejectReason?: string
  histories: Array<unknown>
  description: string
  createdBy: {
    email: string
    _id: string
    name: string
    phone: string
    idCardPhoto: string
    avatar: string
    paymentInfo: {
      bankName: string
      bankShortName: string
      bankCode: string
      accountNumber: string
      accountName: string
    }
  }
  hasMadePayout: boolean
  transactionCode?: string
  attachment?: BaseMediaDto
  createdAt: string
  updatedAt: string
}
