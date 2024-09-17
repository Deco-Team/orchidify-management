import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const ViewGardenManagerList = lazy(() => import('~/pages/garden-manager/list/ViewGardenManagerList'))
const ViewGardenManagerDetail = lazy(() => import('~/pages/garden-manager/detail/ViewGardenManagerDetail'))
const AddGardenManager = lazy(() => import('~/pages/garden-manager/add/AddGardenManager'))
const UpdateGardenManager = lazy(() => import('~/pages/garden-manager/update/UpdateGardenManager'))
const ViewGardenList = lazy(() => import('~/pages/garden/list/ViewGardenList'))

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
  },
  updateGardenManager: {
    name: 'Cập nhật Quản lý vườn',
    path: '/garden-managers/:id/update',
    Component: UpdateGardenManager
  },
  gardenList: {
    name: 'Nhà vườn',
    path: '/gardens',
    Component: ViewGardenList
  }
}
