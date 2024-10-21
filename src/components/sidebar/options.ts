import {
  AutoAwesomeMotion,
  Class,
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
  { id: 2, text: 'Khóa học', link: protectedRoute.courseList.path, Icon: MenuBook },
  { id: 3, text: 'Combo khóa học', link: protectedRoute.dashboard.path, Icon: AutoAwesomeMotion },
  { id: 4, text: 'Lớp học', link: protectedRoute.classList.path, Icon: Class },
  { id: 5, text: 'Yêu cầu lớp học', link: protectedRoute.classRequestList.path, Icon: NoteAlt },
  { id: 6, text: 'Đơn tuyển', link: protectedRoute.dashboard.path, Icon: ContactPage },
  { id: 7, text: 'Giảng viên', link: protectedRoute.instructorList.path, Icon: CoPresent },
  { id: 8, text: 'Học viên', link: protectedRoute.learnerList.path, Icon: School },
  { id: 9, text: 'Nhà vườn', link: protectedRoute.gardenList.path, Icon: LocalFlorist },
  { id: 10, text: 'Quản lý vườn', link: protectedRoute.gardenManagerList.path, Icon: ManageAccounts },
  { id: 11, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: RequestQuote }
]

export const OptionsGardenManager = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Nhà vườn', link: protectedRoute.gardenList.path, Icon: ManageAccounts }
]
