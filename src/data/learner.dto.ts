import { UserStatus } from '~/global/app-status'

export type Learner = {
  _id: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  avatar: string
}
