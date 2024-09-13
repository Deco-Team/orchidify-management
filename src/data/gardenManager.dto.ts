import { UserStatus } from '~/global/app-status'

export type GardenManager = {
  _id: string
  name: string
  email: string
  idCardPhoto: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  gardens: Array<{ _id: string; name: string }>
}
