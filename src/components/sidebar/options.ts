import ContactPageIcon from '@mui/icons-material/ContactPage'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import HomeIcon from '@mui/icons-material/Home'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import SchoolIcon from '@mui/icons-material/School'

import RequestQuoteIcon from '@mui/icons-material/RequestQuote'

export const OptionsAdmin = [
  { id: 1, text: 'Trang chủ', link: 'dashboard', Icon: HomeIcon },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBookIcon }
]

export const OptionsStaff = [
  { id: 1, text: 'Trang chủ', link: 'dashboard', Icon: HomeIcon },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBookIcon },
  { id: 3, text: 'Yêu cầu khóa học', link: 'courseReqs', Icon: NoteAltIcon },
  { id: 4, text: 'Đơn tuyển', link: 'recruiments', Icon: ContactPageIcon },
  { id: 5, text: 'Giảng viên', link: 'instructors', Icon: CoPresentIcon },
  { id: 6, text: 'Học viên', link: 'learners', Icon: SchoolIcon },
  { id: 7, text: 'Nhà vườn', link: 'garden', Icon: LocalFloristIcon },
  { id: 8, text: 'Quản lý vườn', link: 'gardenMng', Icon: ManageAccountsIcon },
  { id: 9, text: 'Yêu cầu rút tiền', link: 'withdrawReqs', Icon: RequestQuoteIcon }
]

export const OptionsGardenMng = [{ id: 1, text: 'Quản lý vườn', link: 'gardenMng', Icon: ManageAccountsIcon }]
