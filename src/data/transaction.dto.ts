import { TransactionStatus } from '~/global/app-status'
import { PaymentMethod, PaymentType, UserRole } from '~/global/constants'

type TransactionAccountDto = {
  userId: string
  userRole: UserRole
  user: {
    name: string
  }
}

export type TransactionListItemResponseDto = {
  _id: string
  type: PaymentType
  paymentMethod: PaymentMethod
  amount: number
  debitAccount: TransactionAccountDto
  creditAccount: TransactionAccountDto
  description: string
  status: TransactionStatus
  createdAt: string
  updatedAt: string
}

export type PaymentPayoutHistoryDto = {
  [key: string]: unknown
}

type Payment = {
  id: string
  code: string
  status: string
  description: string
  orderInfo: string
  createdAt: string
  histories: PaymentPayoutHistoryDto[]
}

type Payout = {
  id: string
  code: string
  status: string
  createdAt: string
  histories: PaymentPayoutHistoryDto[]
}

export type TransactionDetailResponseDto = {
  _id: string
  type: PaymentType
  paymentMethod: PaymentMethod
  amount: number
  debitAccount: TransactionAccountDto
  creditAccount: TransactionAccountDto
  description: string
  status: TransactionStatus
  payment: Payment
  payout: Payout
  createdAt: string
  updatedAt: string
}
