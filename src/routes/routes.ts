import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const ViewGardenManagerList = lazy(() => import('~/pages/garden-manager/list/ViewGardenManagerList'))
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
    path: '/garden-managers',
    Component: ViewGardenManagerList
  },
  gardenManagerDetail: {
    name: 'Thông tin quản lý vườn',
    path: '/garden-managers/:id',
    Component: ViewGardenManagerDetail
  },
  addGardenManager: {
    name: 'Thêm Quản lý vườn',
    path: '/garden-managers/add',
    Component: AddGardenManager
  }
}
