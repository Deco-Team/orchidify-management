import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Loading from '~/components/loading/Loading'
import { ClassToolkitRequirementDto } from '~/data/class.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { SlotDetailDto } from '~/data/gardenTimesheet.dto'
import { useClassApi } from '~/hooks/api/useClassApi'
import useGardenTimesheetApi from '~/hooks/api/useGardenTimesheetApi'
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
  data: { classId: string; slotId: string }
}

const ClassToolkitRequirementsDialog = ({ open, onClose, data }: ClassToolkitRequirementsDialogProps) => {
  const [classData, setClassData] = useState<ClassToolkitRequirementDto | null>(null)
  const [slotData, setSlotData] = useState<SlotDetailDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getClassToolkitRequirements } = useClassApi()
  const { getSlotDetail } = useGardenTimesheetApi()

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line prettier/prettier
      ;(async () => {
        const [{ data: toolkits, error: apiError }, { data: slotDetail, error: slotError }] = await Promise.all([
          getClassToolkitRequirements(data.classId),
          getSlotDetail(data.slotId)
        ])

        setClassData(toolkits)
        setSlotData(slotDetail)

        setError(apiError || slotError)
      })()
    }
  }, [data.classId, data.slotId, getClassToolkitRequirements, getSlotDetail, open])

  if (error) {
    notifyError(error.message)
  }

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: { width: '100%', maxWidth: '1000px' } }}>
      {classData && slotData ? (
        <>
          <DialogTitle display='flex' alignItems='center'>
            <Typography variant='body1' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
              Thông tin lớp học
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </DialogTitle>
          <DialogContent>
            <Box display='flex' flexDirection='column' gap={1} flexGrow='1'>
              <Field label='Ngày' content={dayjs(slotData.start).format('DD/M/YYYY')} />
              <Field
                label='Tiết học'
                content={
                  slotData.slotNumber +
                  ` (${dayjs(slotData.start).format('H:mm')} - ${dayjs(slotData.end).format('H:mm')})`
                }
              />
              <Field label='Mã lớp học' content={classData.code} />
              <Field label='Mã khóa học' content={classData.course.code} />
              <Field label='Tên khóa học' content={classData.title} />
              <Field label='Buổi học' content={`${slotData.metadata?.sessionNumber}`} />
              <Field label='Tên buổi học' content={`${slotData.metadata?.sessionTitle}`} />
              <Field label='Giảng viên' content={classData.instructor.name} />
              <Field label='Nhà vườn' content={slotData.garden?.name} />
            </Box>
            <Box marginTop='1.25rem'>
              <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
                Dụng cụ cần thiết
              </Typography>
              {classData.gardenRequiredToolkits.split(', ').map((tool, index) => (
                <Typography key={index} variant='subtitle1' fontWeight={400} fontSize='16px'>
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
