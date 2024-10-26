import { RecruitmentStatus } from '~/global/app-status'
import { UserRole } from '~/global/constants'

type ApplicationInfo = {
  name: string
  email: string
  phone: string
  cv: string
  note: string
}

export type RecruitmentListItemResponseDto = {
  _id: string
  applicationInfo: ApplicationInfo
  meetingUrl: string
  status: RecruitmentStatus
  rejectReason: string
  handledBy: string
  createdAt: string
  updatedAt: string
}

export type RecruitmentDetailResponeDto = {
  _id: string
  applicationInfo: ApplicationInfo
  meetingUrl: string
  status: RecruitmentStatus
  rejectReason: string
  handledBy: string
  createdAt: string
  updatedAt: string
  histories: [
    {
      status: RecruitmentStatus
      timestamp: string
      userId?: string
      userRole?: UserRole
    }
  ]
}
