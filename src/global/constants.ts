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
  GARDEN_MANAGER = 'GARDEN_MANAGER',
  SYSTEM = 'SYSTEM'
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

export enum RequestType {
  PUBLISH_CLASS = 'PUBLISH_CLASS',
  CANCEL_CLASS = 'CANCEL_CLASS'
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

export enum CalendarType {
  MONTH = 'MONTH',
  WEEK = 'WEEK'
}

export enum PaymentType {
  PAYMENT = 'PAYMENT',
  PAYOUT = 'PAYOUT'
}

export enum PaymentMethod {
  PAY_OS = 'PAY_OS',
  MOMO = 'MOMO',
  ZALO_PAY = 'ZALO_PAY',
  STRIPE = 'STRIPE'
}

export enum NotificationType {
  CLASS = 'CLASS',
  CLASS_REQUEST = 'CLASS_REQUEST',
  PAYOUT_REQUEST = 'PAYOUT_REQUEST'
}
