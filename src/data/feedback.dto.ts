type FeedbackLearnerDetailResponse = {
  _id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  avatar: string
}

export type FeedbackListItemResponseDto = {
  _id: string
  rate: number
  comment: string
  createdAt: string
  updatedAt: string
  learnerId: string
  learner: FeedbackLearnerDetailResponse
  classId: string
}
