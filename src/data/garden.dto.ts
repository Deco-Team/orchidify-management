export type Garden = {
  _id: string
  name: string
  description: string
  address: string
  status: string
  gardenManagerId: string
  createdAt: string
  updatedAt: string
  gardenManager: Array<{
    _id: string
    name: string
    id: string
  }>
}
