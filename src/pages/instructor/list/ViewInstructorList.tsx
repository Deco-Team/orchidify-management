import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { TitleWrapper } from '../detail/ViewInstructorDetail.styled'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import Table from '~/components/table/Table'
import { useInstructorApi } from '~/hooks/api/useInstructorApi'
import { Instructor } from '~/data/instructor.dto'
import { InstructorColumns } from './columns'

const ViewInstructorList = () => {
  const navigate = useNavigate()
  const { getAllInstructors } = useInstructorApi()
  const [data, setData] = useState<ListResponseDto<Instructor>>({
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
      const { data: instructor, error: apiError } = await getAllInstructors(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (instructor) {
        setData(instructor)
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
  }, [getAllInstructors, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Giảng viên
        </Typography>
        <div style={{ display: 'flex' }}>
          <Button
            color='secondary'
            onClick={() => {
              navigate(protectedRoute.addGardenManager.path)
            }}
            sx={{ marginRight: '24px' }}
            endIcon={<AddIcon />}
          >
            Thêm
          </Button>
        </div>
      </TitleWrapper>
      <Table
        title='Danh sách giảng viên'
        tableOptions={{
          columns: InstructorColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          muiTableBodyRowProps: ({ row }) => ({
            onClick: () => navigate(protectedRoute.instructorDetail.path.replace(':id', row.original._id)),
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

export default ViewInstructorList
