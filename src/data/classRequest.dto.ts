import { CourseStatus, RequestStatus } from '~/global/app-status'
import { BaseMediaDto } from './common.dto'
import { AssignmentDto, LessonDto } from './course.dto'
import { CourseLevel, SlotNumber, Weekday } from '~/global/constants'

export type ClassRequestDto = {
  _id: string
  type: string
  description: string
  status: RequestStatus
  metadata: {
    _id: string
    code: string
    title: string
    description: string
    startDate: string
    duration: number
    price: number
    level: CourseLevel
    type: string[]
    thumbnail: string
    media: BaseMediaDto[]
    status: CourseStatus
    learnerLimit: number
    learnerQuantity: number
    weekdays: Array<Weekday>
    slotNumbers: Array<SlotNumber>
    instructorId: string
    lessons: LessonDto[]
    assignments: AssignmentDto[]
    gardenRequiredToolkits: string
    cancelReason?: string
    gardenId?: string
    rate?: number
  }
  createdBy: {
    _id: string
    name: string
    phone: string
    idCardPhoto: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
  courseId?: string
  classId?: string
  rejectReason?: string
}
