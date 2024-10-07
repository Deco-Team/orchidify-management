import { Paper, Box, Typography, Divider } from '@mui/material'
import RequestStatusTag from '~/components/tag/RequestStatusTag'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { RequestStatus } from '~/global/app-status'
import { RequestType } from '~/global/constants'

interface FieldProps {
  label: string
  content?: string
  requestType?: string
  statusTag?: RequestStatus
}

const Field: React.FC<FieldProps> = ({ label, content, requestType, statusTag }) => (
  <Box display='flex' marginY='0.25rem'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {requestType && (
      <Typography variant='subtitle1' fontWeight={400}>
        {requestType === RequestType.PUBLISH_CLASS ? 'Yêu cầu mở lớp' : ''}
      </Typography>
    )}
    {statusTag && <RequestStatusTag type={statusTag} />}
  </Box>
)

interface InstructorRequestDetailInformationProps {
  classRequest: ClassRequestDto
}

const InstructorRequestDetailInformationProps = ({ classRequest }: InstructorRequestDetailInformationProps) => {
  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin yêu cầu
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box marginBottom='1.25rem'>
        <Field label='Loại yêu cầu' requestType={classRequest.type} />
        <Field label='Tên giảng viên' content={classRequest.createdBy.name} />
        <Field label='Thời gian tạo' content={new Date(classRequest.createdAt).toLocaleString('vi-VN')} />
        <Field label='Cập nhật cuối' content={new Date(classRequest.createdAt).toLocaleString('vi-VN')} />
        <Field label='Trạng thái' statusTag={classRequest.status} />
      </Box>
      {classRequest.status === RequestStatus.REJECTED ? (
        <Box marginBottom='1.25rem'>
          <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
            Lý do từ chối
          </Typography>
          <Typography variant='subtitle1' fontWeight={400}>
            {classRequest.rejectReason ? classRequest.rejectReason : 'Không có lý do'}
          </Typography>
        </Box>
      ) : null}
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Mô tả yêu cầu
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {classRequest.description}
        </Typography>
      </Box>
    </Paper>
  )
}

export default InstructorRequestDetailInformationProps
