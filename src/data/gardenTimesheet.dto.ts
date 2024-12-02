import { GardenTimesheetStatus } from '~/global/app-status'

type BaseSlotMetadata = {
  code: string
  title: string
  sessionTitle: string
  sessionNumber: number
}

export type GardenTimesheetItemResponseDto = {
  _id: string
  start: string
  end: string
  status: GardenTimesheetStatus
  classId?: string
  slotNumber?: number
  metadata?: BaseSlotMetadata
  instructor?: {
    name: string
  }
  garden?: {
    name: string
  }
}

export type InstructorTimesheetItemResponseDto = {
  _id: string
  start: string
  end: string
  status: GardenTimesheetStatus
  classId?: string
  slotNumber?: number
  metadata?: BaseSlotMetadata
}

export type SlotDetailDto = {
  _id: string
  start: string
  end: string
  status: GardenTimesheetStatus
  classId?: string
  slotNumber?: number
  metadata?: BaseSlotMetadata
  garden?: {
    name: string
  }
  class: {
    code: string
    title: string
    learnerLimit: number
    learnerQuantity: number
    gardenRequiredToolkits: string
  }
}
