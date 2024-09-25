import { MRT_ColumnDef } from 'material-react-table'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { Staff } from '~/data/staff.dto'
import { UserStatus } from '~/global/app-status'

export const StaffColumns: MRT_ColumnDef<Staff>[] = [
  {
    accessorKey: 'staffCode',
    header: 'Mã nhân viên',
    size: 150,
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: 'Tên nhân viên',
    size: 250
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    size: 200,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue() as unknown as string)
      return date.toLocaleDateString('vi-VN')
    },
    enableColumnFilter: false
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
