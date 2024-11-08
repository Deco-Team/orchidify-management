import { MRT_ColumnDef } from 'material-react-table'
import { Avatar, Box, Rating, Typography } from '@mui/material'
import { FeedbackListItemResponseDto } from '~/data/feedback.dto'

export const feedbackColumns: MRT_ColumnDef<FeedbackListItemResponseDto>[] = [
  {
    accessorKey: 'learner.name',
    header: 'Tên học viên',
    size: 200,
    enableColumnFilter: false,
    enableSorting: false,
    muiTableBodyCellProps: {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    Cell: ({ row }) => (
      <>
        <Avatar src={row.original.learner.avatar} alt={row.original.learner.name} />
        <Typography variant='subtitle1' fontSize='14px' marginLeft='0.5rem'>
          {row.original.learner.name}
        </Typography>
      </>
    )
  },
  {
    accessorKey: 'rate',
    header: 'Sao đánh giá',
    size: 180,
    filterVariant: 'select',
    filterSelectOptions: ['5', '4', '3', '2', '1'],
    Cell: ({ row }) => (
      <Box display='flex'>
        <Rating defaultValue={row.original.rate} precision={0.5} readOnly />
        <Typography variant='body1' marginLeft='0.5rem'>
          {row.original.rate}
        </Typography>
      </Box>
    )
  },
  {
    accessorKey: 'comment',
    header: 'Nhận xét',
    grow: 1,
    enableColumnFilter: false,
    enableSorting: false
  }
]
