import { Typography } from '@mui/material'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '~/components/table/Table'
import { ListResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { TitleWrapper } from '~/pages/garden-manager/detail/ViewGardenManagerDetail.styled'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { ClassRequestColumns } from './columns'
import { ClassRequestListItemResponseDto } from '~/data/classRequest.dto'
import { useClassRequestApi } from '~/hooks/api/useClassRequestApi'

export default function ViewClassRequestList() {
  const navigate = useNavigate()
  const { getAllClassRequests } = useClassRequestApi()
  const [data, setData] = useState<ListResponseDto<ClassRequestListItemResponseDto>>({
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
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [error, setError] = useState<ErrorResponseDto | null>(null)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: classRequests, error: apiError } = await getAllClassRequests(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (classRequests) {
        setData(classRequests)
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
  }, [getAllClassRequests, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Yêu cầu lớp học
        </Typography>
      </TitleWrapper>
      <Table
        title='Danh sách lớp học'
        tableOptions={{
          columns: ClassRequestColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          layoutMode: 'grid',
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          muiTableBodyRowProps: ({ row }) => ({
            onClick: () => navigate(protectedRoute.classRequestDetail.path.replace(':id', row.original._id)),
            sx: {
              cursor: 'pointer'
            }
          }),
          muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 20]
          },
          state: {
            pagination: pagination,
            sorting: sorting,
            columnFilters: columnFilters
          }
        }}
      />
    </>
  )
}
