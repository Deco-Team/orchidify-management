import { MRT_ColumnDef } from 'material-react-table'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { Learner } from '~/data/learner.dto'
import { UserStatus } from '~/global/app-status'

export const LearnerColumns: MRT_ColumnDef<Learner>[] = [
  {
    accessorKey: 'name',
    header: 'Tên học viên',
    size: 200
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 150
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
    accessorKey: 'phone',
    header: 'Số điện thoại',
    size: 100
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