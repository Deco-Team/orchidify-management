export interface GardenManager {
  _id: string
  name: string
  email: string
  idCardPhoto: string
  status: string
  createdAt?: Date
  updatedAt?: Date
  gardens?: Array<{ _id: string; name: string }>
  id?: string
}
