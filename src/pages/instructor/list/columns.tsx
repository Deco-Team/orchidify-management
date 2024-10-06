import { MRT_ColumnDef } from 'material-react-table'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { Instructor } from '~/data/instructor.dto'
import { UserStatus } from '~/global/app-status'

export const InstructorColumns: MRT_ColumnDef<Instructor>[] = [
  {
    accessorKey: 'name',
    header: 'Tên giảng viên',
    size: 250
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 150
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại',
    size: 100
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Ngày sinh',
    size: 100,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    Cell: ({ cell }) => {
      const type = cell.getValue() as UserStatus
      return <UserStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Hoạt động', value: UserStatus.ACTIVE },
      { label: 'Vô hiệu hóa', value: UserStatus.INACTIVE }
    ]
  }
]
