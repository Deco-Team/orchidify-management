import { GardenTimesheetStatus, UserStatus } from '~/global/app-status'

export interface Slot {
  _id: string
  startTime: string
  endTime: string
  status: GardenTimesheetStatus
}

export type GardenTimesheetDto = {
  _id: string
  status: UserStatus
  date: string
  gardenId: string
  createdAt: string
  updatedAt: string
  slots: Slot[]
}
