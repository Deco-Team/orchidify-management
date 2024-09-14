import { MRT_ColumnDef } from 'material-react-table'
import UserStatusTag from '~/components/tag/UserStatusTag'
import { GardenManager } from '~/data/gardenManager.dto'
import { UserStatus } from '~/global/app-status'

export const GardenManagerColumns: MRT_ColumnDef<GardenManager>[] = [
  {
    accessorKey: 'name',
    header: 'Tên quản lý vườn',
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
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    Cell: ({ cell }) => {
      const type = cell.getValue() as UserStatus
      return <UserStatusTag type={type} />
    }
  }
]
