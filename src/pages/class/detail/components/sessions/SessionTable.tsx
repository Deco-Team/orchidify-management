import Table from '~/components/table/Table'
import { sessionColumns } from './session-columns'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { SessionDto } from '~/data/course.dto'

interface SessionTableProps {
  sessions: SessionDto[]
  classId: string
}

const SessionTable = ({ sessions }: SessionTableProps) => {
  const navigate = useNavigate()
  return (
    <Table
      title='Danh sách nội dung buổi học'
      tableOptions={{
        columns: sessionColumns,
        data: sessions || [],
        rowCount: sessions.length,
        enableBottomToolbar: false,
        enableSorting: true,
        enableColumnFilters: false,
        enableHiding: false,
        enableColumnActions: false,
        muiTableBodyRowProps: () => ({
          onClick: () =>
            navigate(
              // protectedRoute.sessionDetail.path
              //   .replace(':classId', classId)
              //   .replace(':sessionId', row.original._id)
              protectedRoute.dashboard.path
            ),
          sx: {
            cursor: 'pointer'
          }
        })
      }}
    />
  )
}
export default SessionTable
