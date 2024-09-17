import {
  ContactPage,
  CoPresent,
  Home,
  LocalFlorist,
  ManageAccounts,
  MenuBook,
  NoteAlt,
  RequestQuote,
  School
} from '@mui/icons-material'
import { protectedRoute } from '~/routes/routes'

export const OptionsAdmin = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBook }
]

export const OptionsStaff = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Khóa học', link: protectedRoute.dashboard.path, Icon: MenuBook },
  { id: 3, text: 'Yêu cầu khóa học', link: protectedRoute.dashboard.path, Icon: NoteAlt },
  { id: 4, text: 'Đơn tuyển', link: protectedRoute.dashboard.path, Icon: ContactPage },
  { id: 5, text: 'Giảng viên', link: protectedRoute.dashboard.path, Icon: CoPresent },
  { id: 6, text: 'Học viên', link: protectedRoute.dashboard.path, Icon: School },
  { id: 7, text: 'Nhà vườn', link: protectedRoute.gardenList.path, Icon: LocalFlorist },
  { id: 8, text: 'Quản lý vườn', link: protectedRoute.gardenManagerList.path, Icon: ManageAccounts },
  { id: 9, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: RequestQuote }
]

export const OptionsGardenManager = [
  { id: 1, text: 'Quản lý vườn', link: protectedRoute.gardenManagerList.path, Icon: ManageAccounts }
]
