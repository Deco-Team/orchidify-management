import { Box, Divider, Paper, Rating, Typography } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { formatCourseLevel, formatCurrency } from '~/utils/format'

interface FieldProps {
  label: string
  content?: string
  rate?: number
}

const Field: React.FC<FieldProps> = ({ label, content, rate }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
    {rate && (
      <Box display='flex'>
        <Rating defaultValue={rate} precision={0.5} readOnly />
        <Typography variant='body1' marginLeft='0.5rem'>
          {rate}
        </Typography>
      </Box>
    )}
  </Box>
)

interface CourseInformationProps {
  classRequest: ClassRequestDto
}

const CourseInformation = ({ classRequest }: CourseInformationProps) => {
  const { metadata: course } = classRequest

  return (
    <Paper sx={{ width: '100%', marginTop: '1.25rem', padding: '1.5rem' }}>
      <Box display='flex' alignItems='center' marginBottom='1.25rem'>
        <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
          Thông tin khóa học
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box display='flex' gap='1rem' marginBottom='1.25rem'>
        <Box width='250px' height='250px'>
          <img
            src={course.thumbnail}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
          <Field label='Mã khóa học' content={course.code} />
          <Field label='Tên khóa học' content={course.title} />
          <Field label='Giảng viên' content={classRequest.createdBy.name} />
          <Field label='Giá' content={formatCurrency(course.price)} />
          <Field label='Cấp độ' content={formatCourseLevel(course.level)} />
          <Field label='Thể loại' content={course.type.join(', ')} />
          <Field label='Giới hạn học viên' content={course.learnerLimit.toString()} />
          {course.rate !== undefined ? <Field label='Đánh giá' rate={course.rate} /> : null}
        </Box>
      </Box>
      <Box marginBottom='1.25rem'>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Mô tả
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {course.description}
        </Typography>
      </Box>
      <Box marginBottom='1.25rem'>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Dụng cụ cần thiết
        </Typography>
        <Typography variant='subtitle1' fontWeight={400}>
          {course.gardenRequiredToolkits}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
          Hình ảnh khóa học
        </Typography>
        <Carousel>
          {course.media.map((media) => (
            <div
              key={media.public_id}
              style={{
                boxSizing: 'border-box'
              }}
            >
              <div style={{ width: '200px', height: '200px', padding: '0 2px' }}>
                <img
                  src={media.url}
                  alt={`Course Image ${media.public_id}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </Box>
    </Paper>
  )
}

export default CourseInformation
