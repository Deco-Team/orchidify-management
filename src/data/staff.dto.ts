import { UserStatus } from '~/global/app-status'
import { UserRole } from '~/global/constants'

export type Staff = {
  email: string
  _id: string
  name: string
  staffCode: string
  idCardPhoto: string
  status: UserStatus
  role: UserRole
  createdAt: string
  updatedAt: string
}
