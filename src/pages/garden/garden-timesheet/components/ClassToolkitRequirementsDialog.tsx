import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import { ClassToolkitRequirementDto } from '~/data/class.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useClassApi } from '~/hooks/api/useClassApi'
import { notifyError } from '~/utils/toastify'

interface FieldProps {
  label: string
  content?: string
}

const Field: React.FC<FieldProps> = ({ label, content }) => (
  <Box display='flex'>
    <Typography variant='subtitle1' fontWeight={600} width={'180px'}>
      {label}
    </Typography>
    {content && (
      <Typography variant='subtitle1' fontWeight={400}>
        {content}
      </Typography>
    )}
  </Box>
)

interface ClassToolkitRequirementsDialogProps {
  open: boolean
  onClose: () => void
  classId: string
}

const ClassToolkitRequirementsDialog = ({ open, onClose, classId }: ClassToolkitRequirementsDialogProps) => {
  const [data, setData] = useState<ClassToolkitRequirementDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getClassToolkitRequirements } = useClassApi()

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: toolkits, error: apiError } = await getClassToolkitRequirements(classId)
        setData(toolkits)
        setError(apiError)
      })()
    }
  }, [classId, getClassToolkitRequirements, open])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: { width: '100%', maxWidth: '1000px' } }}>
      {data ? (
        <>
          <DialogTitle display='flex' alignItems='center' marginBottom='1.25rem'>
            <Typography variant='body1' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
              Thông tin lớp học
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </DialogTitle>
          <DialogContent>
            <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
              <Field label='Mã lớp học' content={data.code} />
              <Field label='Mã khóa học' content={data.course.code} />
              <Field label='Tên khóa học' content={data.title} />
              <Field label='Giảng viên' content={data.instructor.name} />
            </Box>
            <Box marginTop='1.25rem'>
              <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
                Dụng cụ cần thiết
              </Typography>
              {data.gardenRequiredToolkits.split(', ').map((tool) => (
                <Typography variant='subtitle1' fontWeight={400} fontSize='14px'>
                  {tool}
                </Typography>
              ))}
            </Box>
          </DialogContent>
        </>
      ) : (
        <Loading />
      )}
    </Dialog>
  )
}

export default ClassToolkitRequirementsDialog
