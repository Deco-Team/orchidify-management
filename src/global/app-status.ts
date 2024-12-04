export enum CourseStatus {
  DRAFT = 'DRAFT',
  REQUESTING = 'REQUESTING',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED'
}

export enum ClassStatus {
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum RecruitmentStatus {
  PENDING = 'PENDING',
  INTERVIEWING = 'INTERVIEWING',
  SELECTED = 'SELECTED',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED'
}

export enum GardenStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum GardenTimesheetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  AVAILABLE = 'AVAILABLE',
  LOCKED = 'LOCKED',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum TransactionStatus {
  DRAFT = 'DRAFT',
  CAPTURED = 'CAPTURED',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED',
  REFUNDED = 'REFUNDED'
}

export enum LearnerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNVERIFIED = 'UNVERIFIED'
}
