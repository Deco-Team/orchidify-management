import { ClassStatus, CourseStatus, RequestStatus } from '~/global/app-status'
import { BaseMediaDto } from './common.dto'
import { SessionDto } from './course.dto'
import { CourseLevel, RequestType, SlotNumber, Weekday } from '~/global/constants'

export type ClassRequestMetadataDto = {
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
  sessions: SessionDto[]
  gardenRequiredToolkits: string
  histories: Array<unknown>
  instructorId: string
  createdAt: string
  updatedAt: string
  courseId?: string
  course?: {
    code: string
    title: string
  }
  cancelReason?: string
  gardenId?: string
  rate?: number
}

export type ClassRequestCreatedByDto = {
  _id: string
  name: string
  phone: string
  idCardPhoto: string
  avatar: string
}

export type ClassRequestListItemResponseDto = {
  _id: string
  type: RequestType
  description: string
  status: RequestStatus
  metadata: ClassRequestMetadataDto
  createdBy: ClassRequestCreatedByDto | string
  createdAt: string
  updatedAt: string
  rejectReason?: string
  courseId?: string
  classId?: string
}

type ClassRequestStatusHistoryDto = {
  [key: string]: unknown
}

export type ClassRequestClassDto = {
  _id: string
  code: string
  title: string
  description: string
  startDate: string
  price: number
  level: CourseLevel
  type: Array<string>
  duration: number
  thumbnail: string
  media: Array<BaseMediaDto>
  sessions: Array<SessionDto>
  status: ClassStatus
  histories: Array<{ [key: string]: unknown }>
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  gardenRequiredToolkits: string
  instructorId: string
  gardenId: string
  courseId: string
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  rate?: number
  cancelReason?: string
}

export type ClassRequestDetailResponseDto = {
  _id: string
  type: RequestType
  description: string
  status: RequestStatus
  metadata: ClassRequestMetadataDto
  histories: Array<ClassRequestStatusHistoryDto>
  createdBy: ClassRequestCreatedByDto | string
  createdAt: string
  updatedAt: string
  rejectReason?: string
  courseId?: string
  classId?: string
  class?: ClassRequestClassDto
}
