import { RequestStatus } from '~/global/app-status'

export type PayoutRequestListResponseDto = {
  _id: string
  amount: number
  status: RequestStatus
  rejectReason?: string
  description: string
  createdBy: {
    email: string
    _id: string
    name: string
    phone: string
    idCardPhoto: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}

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
  handledBy?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}
