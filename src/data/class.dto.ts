import { ClassStatus, UserStatus } from '~/global/app-status'
import { CourseLevel, SlotNumber, Weekday } from '~/global/constants'
import { BaseMediaDto } from './common.dto'
import { SessionDto } from './course.dto'

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
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  progress?: {
    completed: number
    total: number
    percentage: number
  }
  rate?: number
}

type ClassStatusHistoryDto = {
  [key: string]: unknown
}

export type ClassLearnerDto = {
  _id: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  avatar: string
}

export type ClassDetailResponseDto = {
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
  histories: Array<ClassStatusHistoryDto>
  learnerLimit: number
  learnerQuantity: number
  weekdays: Array<Weekday>
  slotNumbers: Array<SlotNumber>
  gardenRequiredToolkits: string
  learners: Array<ClassLearnerDto>
  instructorId: string
  instructor: {
    name: string
  }
  gardenId: string
  garden: {
    name: string
  }
  courseId: string
  course: {
    code: string
  }
  createdAt: string
  updatedAt: string
  rate?: number
  cancelReason?: string
}

export type ClassToolkitRequirementDto = {
  _id: string
  code: string
  title: string
  courseId: string
  course: {
    code: string
  }
  instructorId: string
  instructor: {
    name: string
  }
  gardenRequiredToolkits: string
}
