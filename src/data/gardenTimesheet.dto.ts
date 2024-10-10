import { GardenTimesheetStatus } from '~/global/app-status'

export interface Slot {
  start: string
  end: string
  status: GardenTimesheetStatus
  classId?: string
  slotNumber?: number
}
