import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const GardenManagerList = lazy(() => import('~/pages/garden-manager/GardenManagerList'))
const ViewGardenManagerDetail = lazy(() => import('~/pages/garden-manager/detail/ViewGardenManagerDetail'))
const AddGardenManager = lazy(() => import('~/pages/garden-manager/add/AddGardenManager'))

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
    Component: Home
  },
  gardenManagerList: {
    name: 'Quản lý vườn',
    path: '/garden-manager',
    Component: GardenManagerList
  },
  gardenManagerDetail: {
    name: 'Thông tin Quản lý vườn',
    path: '/garden-manager/:id',
    Component: ViewGardenManagerDetail
  },
  addGardenManager: {
    name: 'Thêm Quản lý vườn',
    path: '/garden-manager/add',
    Component: AddGardenManager
  }
}
