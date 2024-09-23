import { MRT_ColumnDef } from 'material-react-table'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { Garden } from '~/data/garden.dto'
import { UserStatus } from '~/global/app-status'

export const GardenColumns: MRT_ColumnDef<Garden>[] = [
  {
    accessorKey: 'name',
    header: 'Tên vườn',
    size: 150
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    size: 250
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    size: 200
  },
  {
    accessorFn: (row) => row.gardenManager?.[0]?.name || '',
    header: 'Người quản lý',
    size: 300
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