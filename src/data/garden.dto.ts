export type Garden = {
  _id: string
  name: string
  description: string
  address: string
  status: string
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
