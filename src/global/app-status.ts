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
  CANCELLED = 'CANCELLED'
}

export enum UserStatus {
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
