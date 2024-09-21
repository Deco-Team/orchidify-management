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
  }
}
