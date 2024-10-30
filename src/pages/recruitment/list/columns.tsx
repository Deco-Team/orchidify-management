import Typography from '@mui/material/Typography'
import { MRT_ColumnDef } from 'material-react-table'
import RecruitmentStatusTag from '~/components/tag/RecruitmentStatusTag'
import { RecruitmentListItemResponseDto } from '~/data/recruitment.dto'
import { RecruitmentStatus } from '~/global/app-status'

export const RecruitmentColumns: MRT_ColumnDef<RecruitmentListItemResponseDto>[] = [
  {
    accessorFn: (row) => row.applicationInfo.name,
    header: 'Ứng viên',
    size: 250
  },
  {
    accessorFn: (row) => row.applicationInfo.email,
    header: 'Email',
    size: 150
  },
  {
    accessorFn: (row) => row.applicationInfo.phone,
    header: 'Số điện thoại',
    size: 100
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo',
    size: 100,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue() as unknown as string)
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Cập nhật cuối',
    size: 100,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue() as unknown as string)
      return (
        <>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleTimeString('vi-VN')}
          </Typography>
          <Typography variant='subtitle2' sx={{ fontWeight: 400 }}>
            {new Date(date).toLocaleDateString('vi-VN')}
          </Typography>
        </>
      )
    }
  },
  {
    accessorKey: 'handledBy.name',
    header: 'Nhân viên duyệt',
    size: 250
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    size: 150,
    Cell: ({ row }) => {
      const type = row.original.status
      return <RecruitmentStatusTag type={type} />
    },
    filterVariant: 'multi-select',
    filterSelectOptions: [
      { label: 'Chờ duyệt', value: RecruitmentStatus.PENDING },
      { label: 'Đang phỏng vấn', value: RecruitmentStatus.INTERVIEWING },
      { label: 'Chấp nhận', value: RecruitmentStatus.SELECTED },
      { label: 'Từ chối', value: RecruitmentStatus.REJECTED },
      { label: 'Hết hạn', value: RecruitmentStatus.EXPIRED }
    ]
  }
]
