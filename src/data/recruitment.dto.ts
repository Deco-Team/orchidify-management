import { RecruitmentStatus } from '~/global/app-status'

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
