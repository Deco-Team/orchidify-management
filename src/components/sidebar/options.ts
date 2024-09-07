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

export const OptionsAdmin = [
  { id: 1, text: 'Trang chủ', link: 'dashboard', Icon: Home },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBook }
]

export const OptionsStaff = [
  { id: 1, text: 'Trang chủ', link: 'dashboard', Icon: Home },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBook },
  { id: 3, text: 'Yêu cầu khóa học', link: 'courseReqs', Icon: NoteAlt },
  { id: 4, text: 'Đơn tuyển', link: 'recruiments', Icon: ContactPage },
  { id: 5, text: 'Giảng viên', link: 'instructors', Icon: CoPresent },
  { id: 6, text: 'Học viên', link: 'learners', Icon: School },
  { id: 7, text: 'Nhà vườn', link: 'garden', Icon: LocalFlorist },
  { id: 8, text: 'Quản lý vườn', link: 'gardenMng', Icon: ManageAccounts },
  { id: 9, text: 'Yêu cầu rút tiền', link: 'withdrawReqs', Icon: RequestQuote }
]

export const OptionsGardenMng = [{ id: 1, text: 'Quản lý vườn', link: 'gardenMng', Icon: ManageAccounts }]
