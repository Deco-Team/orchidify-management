import { RequestStatus } from '~/global/app-status'

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
