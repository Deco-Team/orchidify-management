export interface IGardenManager {
  id: number
  name: string
  role: string
  url?: string
  info: {
    email: string
    garden: string
    status: string
  }
}
