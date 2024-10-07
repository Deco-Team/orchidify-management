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
  { id: 2, text: 'Nhân viên', link: protectedRoute.staffList.path, Icon: ManageAccounts }
]

export const OptionsStaff = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Khóa học', link: protectedRoute.dashboard.path, Icon: MenuBook },
  { id: 3, text: 'Yêu cầu lớp học', link: protectedRoute.classRequestList.path, Icon: NoteAlt },
  { id: 4, text: 'Đơn tuyển', link: protectedRoute.dashboard.path, Icon: ContactPage },
  { id: 5, text: 'Giảng viên', link: protectedRoute.instructorList.path, Icon: CoPresent },
  { id: 6, text: 'Học viên', link: protectedRoute.learnerList.path, Icon: School },
  { id: 7, text: 'Nhà vườn', link: protectedRoute.gardenList.path, Icon: LocalFlorist },
  { id: 8, text: 'Quản lý vườn', link: protectedRoute.gardenManagerList.path, Icon: ManageAccounts },
  { id: 9, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: RequestQuote }
]

export const OptionsGardenManager = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Nhà vườn', link: protectedRoute.gardenList.path, Icon: ManageAccounts }
]
