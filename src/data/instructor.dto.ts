import { UserStatus } from '~/global/app-status'

export type Instructor = {
  _id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  idCardPhoto: string
  avatar: string
  bio: string
  certificates: Array<{ name: string; url: string }>
  status: UserStatus
  createdAt: string
  updatedAt: string
}
