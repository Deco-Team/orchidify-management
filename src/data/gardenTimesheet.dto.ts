import { GardenTimesheetStatus } from '~/global/app-status'

export interface Slot {
  _id: string
  start: string
  end: string
  status: GardenTimesheetStatus
  classId?: string
  slotNumber?: number
  metadata?: {
    code: string
    title: string
  }
}
