import { CourseStatus } from '~/global/app-status'
import { BaseMediaDto } from './common.dto'
import { CourseLevel } from '~/global/constants'

export interface SessionDto {
  _id: string
  sessionNumber: number
  title: string
  description: string
  media: BaseMediaDto[]
  assignments: AssignmentDto[]
}

export interface AssignmentDto {
  _id: string
  title: string
  description: string
  attachments: BaseMediaDto[]
}

export type CourseListItemResponseDto = {
  _id: string
  code: string
  title: string
  price: number
  level: CourseLevel
  type: string[]
  duration: number
  thumbnail: string
  status: CourseStatus
  learnerLimit: number
  rate: number
  discount: number
  instructorId: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type CourseDetailResponseDto = {
  _id: string
  code: string
  title: string
  description: string
  price: number
  level: CourseLevel
  type: string[]
  duration: number
  thumbnail: string
  media: BaseMediaDto[]
  status: CourseStatus
  sessions: SessionDto[]
  learnerLimit: number
  rate: number
  discount: number
  gardenRequiredToolkits: string
  instructorId: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  instructor: {
    _id: string
    name: string
    idCardPhoto: string
    avatar: string
    bio: string
  }
}
