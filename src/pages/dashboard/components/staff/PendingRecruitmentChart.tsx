import { Box, Paper, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { RecruitmentListItemResponseDto } from '~/data/recruitment.dto'
import { RecruitmentStatus } from '~/global/app-status'
import { useRecruitmentApi } from '~/hooks/api/useRecruitmentApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'

const PendingRecruitmentChart = () => {
  const { getAllRecruitments } = useRecruitmentApi()
  const [data, setData] = useState<ListResponseDto<RecruitmentListItemResponseDto>>({
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  })
  const [error, setError] = useState<ErrorResponseDto | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: recruitmentList, error: apiError } = await getAllRecruitments(
        1,
        5,
        [],
        [{ field: 'status', value: RecruitmentStatus.PENDING }]
      )
      if (recruitmentList) {
        setData(recruitmentList)
      } else {
        setData({
          docs: [],
          totalDocs: 0,
          offset: 0,
          limit: 0,
          totalPages: 0,
          page: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null
        })
      }
      setError(apiError)
    })()
  }, [getAllRecruitments])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Paper>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        paddingX='1.5rem'
        paddingY='1rem'
        borderBottom='1px solid #0000001F'
      >
        <Typography fontSize='1.25rem' fontWeight='500'>
          Đơn tuyển đang chờ
        </Typography>
        <Typography
          variant='caption'
          component={Link}
          color='#000000DE'
          to={protectedRoute.recruitmentList.path}
          sx={{ textDecoration: 'none' }}
        >
          Xem tất cả
        </Typography>
      </Box>
      <TableDisplay data={data.docs} />
    </Paper>
  )
}

export default PendingRecruitmentChart

interface TableDisplayProps {
  data: RecruitmentListItemResponseDto[]
}

const TableDisplay = ({ data }: TableDisplayProps) => {
  const navigate = useNavigate()
  const recruitmentColumns: MRT_ColumnDef<RecruitmentListItemResponseDto>[] = [
    {
      accessorFn: (row) => row.applicationInfo.name,
      header: 'Ứng viên',
      Cell: ({ cell }) => {
        return (
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 400,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {cell.getValue() as string}
          </Typography>
        )
      }
    },
    {
      accessorFn: (row) => row.applicationInfo.email,
      header: 'Email',
      Cell: ({ cell }) => {
        return (
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 400,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {cell.getValue() as string}
          </Typography>
        )
      }
    },
    {
      accessorFn: (row) => row.applicationInfo.phone,
      header: 'Số điện thoại',
      size: 120,
      grow: false
    },
    {
      accessorKey: 'createdAt',
      header: 'Thời gian tạo',
      grow: false,
      size: 120,
      muiTableBodyCellProps: {
        style: {
          flexDirection: 'column',
          alignItems: 'flex-start'
        }
      },
      Cell: ({ cell }) => {
        const date = cell.getValue() as string
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
    }
  ]

  return (
    <Table
      tableOptions={{
        columns: recruitmentColumns,
        data: data || [],
        rowCount: data.length,
        layoutMode: 'grid',
        manualSorting: false,
        enableFullScreenToggle: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        muiTablePaperProps: {
          sx: { boxShadow: 'none' }
        },
        muiTableHeadCellProps: {
          sx: { bgcolor: '#F2F2F7' }
        },
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(protectedRoute.recruitmentDetail.path.replace(':id', row.original._id)),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
