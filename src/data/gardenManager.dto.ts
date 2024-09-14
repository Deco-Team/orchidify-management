import { UserStatus } from '~/global/app-status'

export type GardenManager = {
  _id: string
  name: string
  email: string
  idCardPhoto: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  gardens?: Array<{ _id: string; name: string }>
}
