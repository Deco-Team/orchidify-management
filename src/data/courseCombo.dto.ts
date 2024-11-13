import { CourseStatus } from '~/global/app-status'
import { CourseLevel } from '~/global/constants'
import { InstructorCourseDto } from './course.dto'

export type CourseComboListItemResponseDto = {
  _id: string
  code: string
  title: string
  discount: number
  status: CourseStatus
  createdAt: string
  updatedAt: string
  childCourseIds: string[]
  instructorId: string
  instructor: InstructorCourseDto
}

export type ChildCourseDetailDto = {
  _id: string
  code: string
  title: string
  description: string
  price: number
  level: CourseLevel
  type: string[]
  status: CourseStatus
  learnerLimit: number
  rate: number
  discount: number
  createdAt: string
  updatedAt: string
}

export type CourseComboDetailResponseDto = {
  _id: string
  code: string
  title: string
  description: string
  discount: number
  status: CourseStatus
  createdAt: string
  updatedAt: string
  childCourseIds: string[]
  childCourses: ChildCourseDetailDto[]
  instructorId: string
  instructor: InstructorCourseDto
}
