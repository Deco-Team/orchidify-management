export enum UserSide {
  LEARNER = 'LEARNER',
  INSTRUCTOR = 'INSTRUCTOR',
  MANAGEMENT = 'MANAGEMENT'
}

export enum UserRole {
  LEARNER = 'LEARNER',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  GARDEN_MANAGER = 'GARDEN_MANAGER'
}

export const FileSize = {
  '5MB': { text: '5MB', size: 1024 * 1024 * 5 }
}

export const FileFormat = {
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png'
}

export enum CourseLevel {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum ClassStatus {
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
}

export enum RequestType {
  PUBLISH_CLASS = 'PUBLISH_CLASS'
}

export enum Weekday {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export enum SlotNumber {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}
