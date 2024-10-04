import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { GardenManager } from '~/data/gardenManager.dto'
import { useGardenManagerApi } from '~/hooks/api/useGardenManagerApi'
import { TitleWrapper } from '../detail/ViewGardenManagerDetail.styled'
import { GardenManagerColumns } from './columns'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import Table from '~/components/table/Table'

const ViewGardenManagerList = () => {
  const navigate = useNavigate()
  const { getAllGardenManagers } = useGardenManagerApi()
  const [data, setData] = useState<ListResponseDto<GardenManager>>({
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
      const { data: gardenManager, error: apiError } = await getAllGardenManagers(
        pagination.pageIndex + 1,
        pagination.pageSize,
        sorting.map((sort) => ({ field: sort.id, desc: sort.desc })),
        columnFilters.map((filter) => ({ field: filter.id, value: filter.value }))
      )
      if (gardenManager) {
        setData(gardenManager)
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
  }, [getAllGardenManagers, pagination.pageIndex, pagination.pageSize, sorting, columnFilters])

  if (error) {
    notifyError(error.message)
  }

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5' fontSize={34} fontWeight={700}>
          Quản lý vườn
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
        title='Danh sách quản lý vườn'
        tableOptions={{
          columns: GardenManagerColumns,
          data: data.docs || [],
          rowCount: data.totalDocs,
          onPaginationChange: setPagination,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          muiTableBodyRowProps: ({ row }) => ({
            onClick: () => navigate(`/garden-managers/${row.original._id}`),
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

export default ViewGardenManagerList
