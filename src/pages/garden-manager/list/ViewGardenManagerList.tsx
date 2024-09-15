import AddIcon from '@mui/icons-material/Add'
import { Button, Typography, useTheme } from '@mui/material'
import { MaterialReactTable, MRT_PaginationState, useMaterialReactTable } from 'material-react-table'
import { useEffect, useState } from 'react'
import { ListResponseDto } from '~/data/common.dto'
import { GardenManager } from '~/data/gardenManager.dto'
import { useGardenManagerApi } from '~/hooks/api/useGardenManagerApi'
import { TitleWrapper } from '../detail/ViewGardenManagerDetail.styled'
import { GardenManagerColumns } from './columns'
import { ErrorResponseDto } from '~/data/error.dto'
import { notifyError } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'

const ViewGardenManagerList = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { getAllGardenManager } = useGardenManagerApi()
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
    pageSize: 5
  })
  const [error, setError] = useState<ErrorResponseDto | null>(null)

  const table = useMaterialReactTable({
    columns: GardenManagerColumns,
    data: data.docs,
    rowCount: data.totalDocs,
    pageCount: data.totalPages,
    manualPagination: true,
    onPaginationChange: setPagination,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/garden-manager/${row.original._id}`),
      sx: {
        cursor: 'pointer'
      }
    }),
    renderTopToolbarCustomActions: () => (
      <Typography variant='subtitle1' my={'auto'} sx={{ color: theme.palette.info.dark }}>
        Danh sách quản lý vườn
      </Typography>
    ),
    muiTablePaperProps: {
      style: {
        marginTop: '1.5rem'
      }
    }
  })

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data: gardenManager, error: apiError } = await getAllGardenManager(
        pagination.pageIndex + 1,
        pagination.pageSize
      )
      if (gardenManager && !apiError) {
        setData(gardenManager)
      }
      setError(apiError)
    })()
  }, [getAllGardenManager, pagination.pageIndex, pagination.pageSize])

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
              alert('add')
            }}
            sx={{ marginRight: '24px' }}
            endIcon={<AddIcon />}
          >
            Thêm
          </Button>
        </div>
      </TitleWrapper>
      <MaterialReactTable table={table} />
    </>
  )
}

export default ViewGardenManagerList
