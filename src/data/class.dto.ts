import { ClassStatus } from '~/global/app-status'
import { CourseLevel, SlotNumber, Weekday } from '~/global/constants'

export type ClassListItemResponseDto = {
  _id: string
  code: string
  title: string
  startDate: string
  price: number
  level: CourseLevel
  type: Array<string>
  duration: number
  thumbnail: string
  status: ClassStatus
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  createdAt: string
  updatedAt: string
  rate?: number
}
