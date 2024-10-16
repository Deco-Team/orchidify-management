import { lazy } from 'react'
import { UserRole } from '~/global/constants'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const ViewGardenManagerList = lazy(() => import('~/pages/garden-manager/list/ViewGardenManagerList'))
const ViewGardenManagerDetail = lazy(() => import('~/pages/garden-manager/detail/ViewGardenManagerDetail'))
const AddGardenManager = lazy(() => import('~/pages/garden-manager/add/AddGardenManager'))
const UpdateGardenManager = lazy(() => import('~/pages/garden-manager/update/UpdateGardenManager'))
const ViewGardenList = lazy(() => import('~/pages/garden/list/ViewGardenList'))
const AddGarden = lazy(() => import('~/pages/garden/add/AddGarden'))
const ViewGardenDetail = lazy(() => import('~/pages/garden/detail/ViewGardenDetail'))
const UpdateGardenInfo = lazy(() => import('~/pages/garden/update-info/UpdateGardenInfo'))
const UpdateGardenMangerOfGarden = lazy(() => import('~/pages/garden/update-garden-manager/UpdateGardenManager'))
const ViewStaffList = lazy(() => import('~/pages/staff/list/ViewStaffList'))
const ViewStaffDetail = lazy(() => import('~/pages/staff/detail/ViewStaffDetail'))
const AddStaff = lazy(() => import('~/pages/staff/add/AddStaff'))
const UpdateStaff = lazy(() => import('~/pages/staff/update/UpdateStaff'))
const ViewLearnerList = lazy(() => import('~/pages/learner/list/ViewLearnerList'))
const ViewLearnerDetail = lazy(() => import('~/pages/learner/detail/ViewLearnerDetail'))
const ViewInstructorList = lazy(() => import('~/pages/instructor/list/ViewInstructorList'))
const ViewInstructorDetail = lazy(() => import('~/pages/instructor/detail/ViewInstructorDetail'))
const ViewClassRequestList = lazy(() => import('~/pages/class-request/list/ViewClassRequestList'))
const ViewClassRequestDetail = lazy(() => import('~/pages/class-request/detail/ViewClassRequestDetail'))
const ViewGardenTimesheet = lazy(() => import('~/pages/garden/garden-timesheet/GardenTimesheet'))
const ViewCourseList = lazy(() => import('~/pages/course/list/ViewCourseList'))

export const publicRoute = {
  login: {
    name: 'Đăng nhập',
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  dashboard: {
    name: 'Trang chủ',
    path: '/dashboard',
    Component: Home,
    roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.GARDEN_MANAGER]
  },
  gardenManagerList: {
    name: 'Quản lý vườn',
    path: '/garden-managers',
    Component: ViewGardenManagerList,
    roles: [UserRole.STAFF]
  },
  gardenManagerDetail: {
    name: 'Thông tin quản lý vườn',
    path: '/garden-managers/:id',
    Component: ViewGardenManagerDetail,
    roles: [UserRole.STAFF]
  },
  addGardenManager: {
    name: 'Thêm Quản lý vườn',
    path: '/garden-managers/add',
    Component: AddGardenManager,
    roles: [UserRole.STAFF]
  },
  updateGardenManager: {
    name: 'Cập nhật Quản lý vườn',
    path: '/garden-managers/:id/update',
    Component: UpdateGardenManager,
    roles: [UserRole.STAFF]
  },
  gardenList: {
    name: 'Nhà vườn',
    path: '/gardens',
    Component: ViewGardenList,
    roles: [UserRole.STAFF, UserRole.GARDEN_MANAGER]
  },
  addGarden: {
    name: 'Thêm nhà vườn',
    path: '/gardens/add',
    Component: AddGarden,
    roles: [UserRole.STAFF]
  },
  gardenDetail: {
    name: 'Thông tin nhà vườn',
    path: '/gardens/:id',
    Component: ViewGardenDetail,
    roles: [UserRole.STAFF, UserRole.GARDEN_MANAGER]
  },
  updateGardenInfo: {
    name: 'Cập nhật nhà vườn',
    path: '/gardens/:id/update',
    Component: UpdateGardenInfo,
    roles: [UserRole.STAFF, UserRole.GARDEN_MANAGER]
  },
  updateGardenManagerOfGarden: {
    name: 'Thay đổi quản lý vườn',
    path: '/gardens/:id/update-garden-manager',
    Component: UpdateGardenMangerOfGarden,
    roles: [UserRole.STAFF]
  },
  staffList: {
    name: 'Nhân viên',
    path: '/staffs',
    Component: ViewStaffList,
    roles: [UserRole.ADMIN]
  },
  staffDetail: {
    name: 'Thông tin nhân viên',
    path: '/staffs/:id',
    Component: ViewStaffDetail,
    roles: [UserRole.ADMIN]
  },
  addStaff: {
    name: 'Thêm nhân viên',
    path: '/staffs/add',
    Component: AddStaff,
    roles: [UserRole.ADMIN]
  },
  updateStaff: {
    name: 'Cập nhật nhân viên',
    path: '/staffs/:id/update',
    Component: UpdateStaff,
    roles: [UserRole.ADMIN]
  },
  learnerList: {
    name: 'Học viên',
    path: '/learners',
    Component: ViewLearnerList,
    roles: [UserRole.STAFF]
  },
  learnerDetail: {
    name: 'Thông tin học viên',
    path: '/learners/:id',
    Component: ViewLearnerDetail,
    roles: [UserRole.STAFF]
  },
  instructorList: {
    name: 'Giảng viên',
    path: '/instructors',
    Component: ViewInstructorList,
    roles: [UserRole.STAFF]
  },
  instructorDetail: {
    name: 'Thông tin giảng viên',
    path: '/instructors/:id',
    Component: ViewInstructorDetail,
    roles: [UserRole.STAFF]
  },
  classRequestList: {
    name: 'Yêu cầu lớp học',
    path: '/class-requests',
    Component: ViewClassRequestList,
    roles: [UserRole.STAFF]
  },
  classRequestDetail: {
    name: 'Chi tiết yêu cầu',
    path: '/class-requests/:id',
    Component: ViewClassRequestDetail,
    roles: [UserRole.STAFF]
  },
  viewGardenTimesheet: {
    name: 'Lịch',
    path: '/gardens/:id/timesheet',
    Component: ViewGardenTimesheet,
    roles: [UserRole.STAFF, UserRole.GARDEN_MANAGER]
  },
  courseList: {
    name: 'Khóa học',
    path: '/courses',
    Component: ViewCourseList,
    roles: [UserRole.STAFF]
  }
}
