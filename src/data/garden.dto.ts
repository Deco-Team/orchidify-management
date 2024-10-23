import { GardenStatus } from '~/global/app-status'

export type Garden = {
  _id: string
  name: string
  description: string
  address: string
  status: GardenStatus
  maxClass: number
  gardenManagerId: string
  createdAt: string
  updatedAt: string
  gardenManager: Array<{
    _id: string
    name: string
    id: string
  }>
  images?: Array<string>
}

export type AvailableGardenDto = {
  _id: string
  name: string
}
